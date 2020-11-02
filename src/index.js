import IceCream from "./IceCream";

const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
const Router = require('koa-router');
const cors = require('koa-cors');
const bodyparser = require('koa-bodyparser');

app.use(bodyparser());
app.use(cors());
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} ${ctx.response.status} - ${ms}ms`);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.body = { issue: [{ error: err.message || 'Unexpected error' }] };
    ctx.response.status = 500;
  }
});


const iceCreams = [];
for (let i = 0; i < 3; i++) {
  iceCreams.push(new IceCream({
    id: `${i}`,
    name: `Ice Cream ${i}`,
    addedDate: new Date(Date.now() + i),
    type: 'Chocolate',
    kcal: 180,
    hasGluten: true,
    photo: 'https://recipeland.com/images/r/17839/2dd845aa872d103562c9_1024.jpg'
  }));
}

let lastUpdated = iceCreams[iceCreams.length - 1].addedDate;
let lastId = iceCreams[iceCreams.length - 1].id;
const pageSize = 10;

const broadcast = data =>
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });

const router = new Router();

router.get('/icecream', ctx => {
  const text = ctx.request.query.text;
  const page = parseInt(ctx.request.query.page) || 1;
  ctx.response.set('Last-Modified', lastUpdated.toUTCString());
  const offset = (page - 1) * pageSize;
  ctx.response.body = {
    page,
    icecreams: iceCreams,
    more: offset + pageSize < iceCreams.length
  };
  ctx.response.body = iceCreams;
  ctx.response.status = 200;
});

router.get('/icecream/:id', async (ctx) => {
  const itemId = ctx.request.params.id;
  const item = iceCreams.find(item => itemId === item.id);
  if (item) {
    ctx.response.body = item;
    ctx.response.status = 200; // ok
  } else {
    ctx.response.body = { issue: [{ warning: `Ice Cream with id ${itemId} not found` }] };
    ctx.response.status = 404; // NOT FOUND (if you know the resource was deleted, then return 410 GONE)
  }
});

const createIceCream = async (ctx) => {
  const iceCream = ctx.request.body;
  if (!iceCream.name) { // validation
    ctx.response.body = { issue: [{ error: 'Name is missing' }] };
    ctx.response.status = 400; //  BAD REQUEST
    return;
  }
  iceCream.id = `${parseInt(lastId) + 1}`;
  lastId = iceCream.id;
  iceCreams.push(iceCream);
  ctx.response.body = iceCream;
  ctx.response.status = 201; // CREATED
  broadcast({ event: 'created', payload: { iceCream } });
};

router.post('/icecream', async (ctx) => {
  await createIceCream(ctx);
});

router.put('/icecream/:id', async (ctx) => {
  const id = ctx.params.id;
  const iceCream = ctx.request.body;
  const iceCreamId = iceCream.id;
  if (iceCreamId && id !== iceCream.id) {
    ctx.response.body = { issue: [{ error: `Param id and body id should be the same` }] };
    ctx.response.status = 400; // BAD REQUEST
    return;
  }
  if (!iceCreamId) {
    await createIceCream(ctx);
    return;
  }
  const index = iceCreams.findIndex(iceCream => iceCream.id === id);
  if (index === -1) {
    ctx.response.body = { issue: [{ error: `Ice Cream with id ${id} not found` }] };
    ctx.response.status = 400; // BAD REQUEST
    return;
  }
  iceCreams[index] = iceCream;
  //lastUpdated = new Date();
  ctx.response.body = iceCream;
  ctx.response.status = 200; // OK
  broadcast({ event: 'updated', payload: { iceCream } });
});

router.del('/icecream/:id', ctx => {
  const id = ctx.params.id;
  const index = iceCreams.findIndex(iceCream => id === iceCream.id);
  if (index !== -1) {
    const iceCream = iceCreams[index];
    iceCreams.splice(index, 1);
    //lastUpdated = new Date();
    broadcast({ event: 'deleted', payload: { iceCream } });
  }
  ctx.response.status = 204; // no content
});
//
// setInterval(() => {
//   lastUpdated = new Date();
//   lastId = `${parseInt(lastId) + 1}`;
//   const item = new Item({ id: lastId, text: `item ${lastId}`, date: lastUpdated, version: 1 });
//   items.push(item);
//   console.log(`
//    ${item.text}`);
//   broadcast({ event: 'created', payload: { item } });
// }, 15000);

app.use(router.routes());
app.use(router.allowedMethods());

server.listen(3000);
