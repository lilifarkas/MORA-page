using backend.Models.Entities;

namespace backend.Services;

public interface IUserService
{
    public Task<User> Add(User entity);
    public Task<User> GetById(long id);
    public Task<User> GetByName(string name);
    public Task<User> GetByEmail(string email);
    public Task<IEnumerable<User>> GetAll();
    public Task Update(User entity, long id);
    public Task Delete(long id);
}