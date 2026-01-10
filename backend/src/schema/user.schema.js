import z from "zod";

export const userRegisterSchema = z.object({
    body: z.object({
        fullName: z.string(),
        email: z.email("Invalid Email!!!"),
        password: z.string().min(6, "Password must be at least 6 character long!!!")
    })
})

export const userLoginSchema = z.object({
    body: z.object({
        email: z.email("Invalid Email!!!"),
        password: z.string().min(6, "Password must be at least 6 characters long!!!")
    })
})