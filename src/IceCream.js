export default  class IceCream {
    constructor({ id, name, addedDate, type, kcal, hasGluten, photo }) {
        this.id = id;
        this.name = name;
        this.addedDate = addedDate;
        this.type = type;
        this.kcal = kcal;
        this.hasGluten= hasGluten;
        this.photo = photo;
    }
}
