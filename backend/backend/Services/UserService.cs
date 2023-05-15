using backend.Models.Entities;

namespace backend.Services;

public class UserService: IUserService<User>
{
    public Task Add(User entity)
    {
        throw new NotImplementedException();
    }

    public Task<User> Get(long id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<User>> GetAll()
    {
        throw new NotImplementedException();
    }

    public Task Update(User entity)
    {
        throw new NotImplementedException();
    }

    public Task Delete(long id)
    {
        throw new NotImplementedException();
    }
}