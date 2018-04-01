var User =require('../models/user');

var async =require('async');

exports.index =function(req, res) {
    async.parallel({
      user_count:function(callback){
        User.count(callback);
      },
      list_users: function(callback) {
        User.find(callback)
        .sort([['first_name','ascending']])
      }
    },
      function(err, results){
        res.render('index',{title: 'Current Members', error: err, userCount: results.user_count, userList: results.list_users})
      }
    )
}

//handle book create on POST.
exports.user_create = [
  (req, res, next) => {
    var user = new User(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_id: req.body.email_id,
        age : req.body.age,
        phone_no: req.body.phone_no
      });
//Data from form is valid.save book.
      user.save(function (err) {
        if (err) {return next(err);}
        res.redirect('/users');
      })

  }
]

//handle GET request for user details - name, age, email, phone
exports.user_detail = function(req, res, next) {
  async.parallel({
    detail: function(callback){
      User.findById(req.params.id)
             .exec(callback);

      }
    },  function(err, results){
        console.log(results);
        if(err){return next(err);}
        res.render('user_detail', {userDetail: results.detail})

  })
 }

 exports.user_edit_get = function(req, res, next) {
  async.parallel({
    detail: function(callback){
      User.findById(req.params.id)
              .exec(callback);
    }
  }, function(err, results){

  //  console.log(results);
    if(err){ return next(err);}
    res.render('user_detail_edit', { userDetail: results.detail})
  })
}

 exports.user_edit_post = function (req, res, next) {
   async.parallel({
     detail: function(callback){
       User.findById(req.params.id, function (err, doc){
         if (err) {return next(err);}
         doc.first_name  = req.body.first_name,
         doc.last_name   = req.body.last_name,
         doc.age         = req.body.age,
         doc.email_id    = req.body.email_id,
         doc.phone_no    = req.body.phone_no
         doc.save(callback);
       });
      }
   }, function(err, results){
     if(err) {return next(err);}
     res.redirect(results.detail.url);
   })
}

exports.user_delete_post = function(req, res, next) {
  async.parallel({
    detail: function(callback){
      User.findById(req.params.id)
      .exec(callback);
    }
  }, function(err, results){
    if(err){return next(err);}
    User.findByIdAndRemove(req.params.id, function deleteUser(err) {
      if (err) {return next(err);}
      //success - got to books list.
      res.redirect('/users');
    });
  })
}
