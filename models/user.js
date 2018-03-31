var mongoose =require('mongoose');

var Schema =mongoose.Schema;

var UserSchema = new Schema(
  {
    first_name:{type: String, required: true, max:100},
    last_name :{type: String, required: true, max:100},
    age       :{type: String, required: true, max:100},
    email_id  :{type: String, required: true, max:100},
    phone_no  :{type: String, required: true, max:100}
  }
);

//Virtual for user "full" name.
UserSchema
.virtual('name')
.get(function() {
  return this.first_name + " "+ this.last_name;
});

UserSchema
.virtual('urlEdit')
.get(function () {
  return '/users/user/'+this._id+'/edit';
});


UserSchema
.virtual('url')
.get(function () {
  return '/users/user/'+this._id;
});

//Export model.
module.exports =mongoose.model('User',UserSchema);
