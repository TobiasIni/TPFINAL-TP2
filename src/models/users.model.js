class usersModelMemory {
    constructor() {
      this.users = [];
    }

    getUsers = async () => {
      return this.users;
    };

    newUser = async (user) => {
      const data = await this.users.push(user)
      return data;
    };

     editUsers = async (id, data) => {
        data.id = id
        const index = this.users.findIndex((e) => e.id == id)
        users.splice(index, 1, data)
        return data
    }
  }

  export default usersModelMemory;