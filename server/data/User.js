const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

let requiredValidationMessage = '{PATH} is required.'

let userSchema = mongoose.Schema({
  username: { type: String, requiredValidationMessage, unique: true },
  firstName: { type: String, requiredValidationMessage },
  lastName: { type: String, requiredValidationMessage },
  salt: { type: String, requiredValidationMessage },
  hashedPassword: { type: String, requiredValidationMessage },
  roles: [String]
})

userSchema.method({
  authenticate: (password) => {
    let inputHashedPassword = encryption.generateHashedPassword(this.salt, password)
    if (inputHashedPassword === this.hashedPassword) {
      return true
    } else {
      return false
    }
  }
})

let User = mongoose.model('User', userSchema)

module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length === 0) {
      let salt = encryption.generateSalt()
      let hashedPass = encryption.generateHashedPassword(salt, 'test123')
      User.create({
        username: 'admin',
        firstName: 'Michaela',
        lastName: 'Lukanova',
        salt: salt,
        hashedPassword: hashedPass,
        roles: ['Admin']
      })
    }
  })
}
