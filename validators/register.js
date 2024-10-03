import z from "zod"

export const userSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3)
        .max(15)
    ,
    username: z
        .string()
        .trim()
        .min(5)
        .max(15),
    password: z
        .string()
        .min(5)
        .max(15)
    ,
    confirmPassword: z.string(),
    email: z.string().email(),
    age: z.number().min(18)

})
    .strict()
    .refine(data => data.password === data.confirmPassword, {
        message: "passwords must match",
        path: ["confirmPassword"] // اینجا مشخص می‌کند که خطا به کدام فیلد نسبت داده شود
    })
