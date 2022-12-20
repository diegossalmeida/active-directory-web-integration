using FluentValidation;

namespace ActiveDirectory.WebAPI.Extensions
{
    public static class RulerBuilderExtensions
    {
        public static IRuleBuilderOptions<T, TProperty> NotEmptyString<T, TProperty>(this IRuleBuilder<T, TProperty> ruleBuilder)
        {
            return ruleBuilder.Must(p => p is string s
                ? Equals(s, string.Empty) == false
                : true)
                .WithMessage((t, p) => $"Empty string is not supported.");
        }
    }
}
