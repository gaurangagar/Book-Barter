const mongoose=require('mongoose')
const { Schema, model } = mongoose;

const bookSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
    },
    description:{
        type: String
    },
    issuedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    condition:{
        type:String,
        enum:['new','medium','old'],
        required:true
    },
    toRent:{
        type:Boolean,
        required:true
    },
    toSell:{
        type:Boolean,
        required:true
    },
    genre:{
        type:String,
        enum:[
            'fiction','non-fiction','fantasy',
            'romance','mystery','thriller',
            'biography','self-help','history',
            'children','young adult','education',
            'comics','religion','science fiction',
        ],
        required:true
    },
    availableInCities:{
        type:[String],
        required:true
    },
    status: {
        type: String,
        enum: ['available', 'issued', 'reserved'],
        default: 'available'
    },
    rentPrice: {
        type: Number,
        min: 0,
    },
    sellPrice: {
        type: Number,
        min: 0,
    },
},{timestamps:true})

bookSchema.pre('validate', function(next) {
    if (!this.toRent && !this.toSell) {
        return next(new Error('At least one of "toRent" or "toSell" must be true.'));
    }
    if((this.toRent && !this.rentPrice) || (this.toSell && !this.sellPrice)) {
        return next(new Error('Price must be specified'));
    }
    next();
});

const BookModel=model('book',bookSchema)

module.exports=BookModel;