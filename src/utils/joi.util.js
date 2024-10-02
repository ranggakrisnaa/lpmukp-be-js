const Joi = require('joi')

class JoiUtil {
    static registerSchema = Joi.object({
        name: Joi.string().required(),
        nik: Joi.string().required(),
        phone_number: Joi.string()
            .pattern(/^\+[0-9]{1,3}[0-9]{10,16}$/)
            .required()
            .messages({
                'string.pattern.base': `The phone number  have a total length between 10 and 12 characters.`,
            }),
    })

    static loginSchema = Joi.object({
        phone_number: Joi.string()
            .pattern(/^\+[0-9]{1,3}[0-9]{10,16}$/)
            .required()
            .messages({
                'string.pattern.base': `The phone number  have a total length between 10 and 12 characters.`,
            }),
    })

    static otpSchema = Joi.object({
        otp: Joi.number().integer().required(),
    })

    static loanInterestSchema = Joi.object({
        bunga_pinjaman: Joi.number().precision(3).required(),
    })

    static plafondSchema = Joi.object({
        plafond: Joi.number().required(),
    })

    static userProfileSchema = Joi.object({
        name: Joi.string().min(3).required(),
        gender: Joi.string().required(),
        place_birth: Joi.string().min(3).required(),
        date_birth: Joi.date().required(),
        email: Joi.string().email().required(),
        marital_status: Joi.string().required(),
        no_npwp: Joi.string().required(),
        debitur_type: Joi.string().required(),
        address: Joi.string().required(),
        alamat_domisili: Joi.string().required(),
        jumlah_tanggungan: Joi.number().required(),
        vilage_id: Joi.number(),
        district_id: Joi.number(),
        city_id: Joi.number(),
        province_id: Joi.number(),
        user_id: Joi.number(),
    })

    static userProfileUpdateSchema = Joi.object({
        name: Joi.string().min(3),
        gender: Joi.string(),
        place_birth: Joi.string().min(3),
        date_birth: Joi.date(),
        email: Joi.string().email(),
        marital_status: Joi.string(),
        no_npwp: Joi.string(),
        debitur_type: Joi.string(),
        address: Joi.string(),
        alamat_domisili: Joi.string(),
        jumlah_tanggungan: Joi.number(),
        vilage_id: Joi.number(),
        district_id: Joi.number(),
        city_id: Joi.number(),
        province_id: Joi.number(),
        user_id: Joi.number(),
    })

    static businessProfileSchema = Joi.object({
        name: Joi.string().min(3).required(),
        lama_usaha: Joi.string().required(),
        jenis_asset: Joi.string().required(),
        estimasi_nilai_asset: Joi.number().precision(15).required(),
        harbor_id: Joi.number(),
        business_type_id: Joi.number(),
        user_id: Joi.number(),
        marketing_reach_ids: Joi.array(),
        ecommerce_ids: Joi.array(),
    })

    static businessProfileUpdateSchema = Joi.object({
        name: Joi.string().min(3),
        lama_usaha: Joi.string(),
        jenis_asset: Joi.string(),
        estimasi_nilai_asset: Joi.number().precision(15),
        harbor_id: Joi.number(),
        business_type_id: Joi.number(),
        user_id: Joi.number(),
        marketing_reach_ids: Joi.array().required(),
        ecommerce_ids: Joi.array().required(),
    })

    static operationalLogbookSchema = Joi.object({
        category: Joi.string().required(),
        description: Joi.string().required(),
        amount: Joi.number().precision(15),
        type: Joi.string().required(),
        date: Joi.date().required(),
    })

    static operationalLogbookUpdateSchema = Joi.object({
        category: Joi.string().required(),
        description: Joi.string().required(),
        amount: Joi.number().precision(15),
        type: Joi.string().required(),
        date: Joi.date().required(),
    })

    static businessAccountSchema = Joi.object({
        account_number: Joi.string().required(),
        bank_id: Joi.number().required(),
    })

    static applicationSchema = Joi.object({
        user_id: Joi.number(),
        installment_id: Joi.number(),
        bank_id: Joi.number(),
        code: Joi.string(),
        alamat_usaha: Joi.string().required(),
        lama_siklus_usaha: Joi.string().required(),
        estimasi_omset_per_bulan: Joi.number().required(),
        estimasi_biaya_per_bulan: Joi.number().required(),
        estimasi_laba_per_bulan: Joi.number().required(),
        estimasi_biaya_rumah_tangga: Joi.number().required(),
        tujuan_pembiayaan: Joi.string().required(),
        account_ownership: Joi.string().required(),
        desired_financing: Joi.string().required(),
        account_number: Joi.string().required(),
        pendapatan_diluar_usaha: Joi.string().required(),
        jangka_waktu: Joi.number().required(),
    })

    static changePhoneNumberSchema = Joi.object({
        old_phone_number: Joi.string().required(),
        new_phone_number: Joi.string().required(),
    })

    static verifyChangePhoneNumberSchema = Joi.object({
        otp: Joi.string().required(),
    })

    static installmentPaymentSchema = Joi.object({
        amount: Joi.number().required(),
    })

    static verifyInstallmentPaymentSchema = Joi.object({
        status: Joi.string().required(),
    })
}

module.exports = JoiUtil
