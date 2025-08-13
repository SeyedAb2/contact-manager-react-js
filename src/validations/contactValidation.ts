import * as yup from 'yup';

export const contactSchema = yup.object().shape({
    fullname:  yup.string().required('نام و نام خانوادگی الزامی می‌باشد'),
    photo: yup.string().url('ادرس  معتبر نیست').required('ادرس عکس الزامی است'),
    mobile: yup.number().required('شماره موبایل الزامی می  باشد'),
    email: yup.string().email('ایمیل معتبر وارد کنید').required('آدرس ایمیل الزامی است'),
    job: yup.string().nullable(),
    group: yup.string().required('انتخاب گروع الزامی است')
}) 