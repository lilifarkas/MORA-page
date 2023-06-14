using backend.Models.Entities;
using backend.Models.Requests;

namespace backend.Services;

public interface IUserService
{
    public Task<User> Add(User entity);
    public Task<User> GetById(long id);
    public Task<User> GetByName(string name);
    public Task<User> GetByEmail(string email);
    public Task<IEnumerable<User>> GetAll();
    public Task Update(User user, EditUserRequest editUser);
    public Task ChangePassword(long id, ChangePasswordRequest changePasswordRequest);
    public Task Delete(long id);
}