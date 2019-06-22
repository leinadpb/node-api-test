const validate = (envs) => {
  if (!envs.JWT_SECRET) {
    console.log('WARNING: Please, provide JWT_SECRET enviroment variable.')
  }
  if (!envs.CONNECTION_STRING) {
    console.log('WARNING: Please, provide CONNECTION_STRING enviroment variable.')
  }
  if (!envs.PORT) {
    console.log('WARNING: Please, provide PORT enviroment variable.')
  }
}

module.exports = validate;