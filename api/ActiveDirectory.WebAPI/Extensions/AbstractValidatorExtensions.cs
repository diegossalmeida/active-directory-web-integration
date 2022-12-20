using FluentValidation;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ActiveDirectory.WebAPI.Extensions
{
    public static class AbstractValidatorExtensions
    {
        public static void Validate<T>(this AbstractValidator<T> validator, T instance, ModelStateDictionary modelState)
        {
            var results = validator.Validate(instance);

            if (results.IsValid == false)
            {
                foreach (var error in results.Errors)
                {
                    modelState.AddModelError(error.PropertyName, error.ErrorMessage);
                }
            }
        }
    }
}
