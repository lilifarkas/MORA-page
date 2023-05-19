using backend.Models.Entities;

namespace backend.Services;

public interface IDateService
{
    public Task<BookedDate> Add(BookedDate entity);
    public Task<IEnumerable<BookedDate>> GetAll();
    public Task Delete(long id);
    public Task<IEnumerable<BookedDate>> GetUserDates(long id);
}