const { nikParser } = require('nik-parser')
const UserRepository = require('../repositories/user.repository')
const config = require('../config/dotenv.config')
const { ErrHandler } = require('../middlewares/errhandler.middleware')
const prisma = require('../config/prisma.config')
const OtpauthUtil = require('../utils/otpauth.util')
const FsUtil = require('../utils/fs.util')
const TimeUtil = require('../utils/timeconvert.util')

class ProfileService {
    static async addFileUpload(id, reqFile) {
        let payload
        const foundUser = await UserRepository.findUserbyId(id)
        const foundProfile = await prisma.profiles.findFirst({
            where: {
                user_id: foundUser.id,
            },
        })

        const foundIdCard = foundProfile?.id_card?.split('/').pop()
        const foundIdCardSelfie = foundProfile?.id_card_selfie?.split('/').pop()
        const foundNpwpPhoto = foundProfile?.npwp_photo?.split('/').pop()
        const foundSlik = foundProfile?.slik_file?.split('/').pop()

        FsUtil.deleteFileExists(foundIdCard)
        FsUtil.deleteFileExists(foundIdCardSelfie)
        FsUtil.deleteFileExists(foundNpwpPhoto)
        FsUtil.deleteFileExists(foundSlik)

        if (!reqFile) throw new ErrHandler('404', 'File image is not found.')

        const idCard = `http://localhost:${config.PORT}/images/${reqFile[0]?.filename}`
        const idCardSelfie = `http://localhost:${config.PORT}/images/${reqFile[1]?.filename}`
        const npwpPhoto = `http://localhost:${config.PORT}/images/${reqFile[2]?.filename}`
        const slikFile = `http://localhost:${config.PORT}/images/${reqFile[3]?.filename}`

        payload = {
            id_card: idCard,
            id_card_selfie: idCardSelfie,
            npwp_photo: npwpPhoto,
            slik_file: slikFile,
            user_id: foundUser.id,
        }

        return await prisma.profiles.update({
            where: { id: foundProfile.id },
            data: payload,
        })
    }

    static async addFileUploadPartner(id, reqFile) {
        let payload

        if (!reqFile) throw new ErrHandler('404', 'File image is not found.')

        const idCard = `http://localhost:${config.PORT}/images/${reqFile[0]?.filename}`
        const idCardSelfie = `http://localhost:${config.PORT}/images/${reqFile[1]?.filename}`
        const npwpPhoto = `http://localhost:${config.PORT}/images/${reqFile[2]?.filename}`
        const slikFile = `http://localhost:${config.PORT}/images/${reqFile[3]?.filename}`

        payload = {
            id_card: idCard,
            id_card_selfie: idCardSelfie,
            npwp_photo: npwpPhoto,
            slik_file: slikFile,
        }

        return await prisma.profiles.create({
            data: payload,
        })
    }

    static async addProfileImage(id, reqFile) {
        const foundUser = await UserRepository.findUserbyId(id)
        const foundProfile = await prisma.profiles.findFirst({
            where: {
                user_id: foundUser.id,
            },
        })

        const imageUrl = foundProfile?.photo?.split('/').pop()
        FsUtil.deleteFileExists(imageUrl)

        if (!reqFile) throw new ErrHandler(404, 'File image is not found.')

        const imagePath = `http://localhost:${config.PORT}/images/${reqFile?.filename}`

        return await prisma.profiles.update({
            where: {
                id: foundProfile.id,
            },
            data: {
                photo: imagePath,
            },
        })
    }

    static async addUserProfile(id, reqBody) {
        const foundUser = await UserRepository.findUserbyId(id)

        if (reqBody.NIK) {
            const checkNIK = nikParser(reqBody.NIK)
            if (!checkNIK.isValid()) {
                throw new ErrHandler(401, 'NIK doesn`t valid.')
            }
        }

        const payload = {
            ...reqBody,
            date_birth: new Date(reqBody.date_birth),
        }

        await prisma.profiles.update({
            where: { user_id: foundUser.id },
            data: payload,
        })

        return
    }

    static async updateUserProfile(id, reqBody) {
        const foundUser = await UserRepository.findUserbyId(id)

        const foundProfile = await prisma.profiles.findFirst({
            where: { id: foundUser.id },
        })
        const dateConvert = new Date(
            TimeUtil.formatDateToYYYYMMDD(foundProfile.date_birth)
        )
        const dateReqBody = reqBody.date && new Date(reqBody.date)

        const payload = {
            nik: reqBody.nik || foundProfile.nik,
            no_kusuka: reqBody.no_kusuka || foundProfile.no_kusuka,
            gender: reqBody.gender || foundProfile.gender,
            place_birth: reqBody.place_birth || foundProfile.place_birth,
            debitur_type: reqBody.debitur_type || foundProfile.debitur_type,
            date_birth: dateReqBody || dateConvert,
            marital_status:
                reqBody.marital_status || foundProfile.marital_status,
            address: reqBody.address || foundProfile.address,
            email: reqBody.email || foundProfile.email,
            alamat_domisili:
                reqBody.alamat_domisili || foundProfile.alamat_domisili,
            jumlah_tanggungan:
                reqBody.jumlah_tanggungan || foundProfile.jumlah_tanggungan,
            village_id: reqBody.village_id || foundProfile.village_id,
        }

        await prisma.profiles.update({
            where: { id: foundProfile.id },
            data: payload,
        })

        return
    }

    static async addBusinessProfile(id, reqBody) {
        const { ecommerce_ids, marketing_reach_ids, ...restReqBody } = reqBody
        const foundUser = await UserRepository.findUserbyId(id)

        let payload = {
            ...restReqBody,
            user_id: foundUser.id,
        }

        const foundBusinessType = await prisma.business_types.findFirst({
            where: {
                id: reqBody.business_type_id,
            },
        })
        if (!foundBusinessType)
            throw new ErrHandler(404, 'Business type data is not found.')

        return prisma.$transaction(async (tx) => {
            const data = await tx.business_profiles.create({ data: payload })
            const ecommerceIds = ecommerce_ids

            for (let i = 0; i < ecommerceIds.length; i++) {
                const ecommerceId = ecommerceIds[i]

                await tx.business_profile_ecommerces.create({
                    data: {
                        business_profile_id: data.id,
                        ecommerce_id: ecommerceId,
                    },
                })
            }

            const marketingReachIds = marketing_reach_ids
            for (let i = 0; i < marketingReachIds.length; i++) {
                const marketingReachId = ecommerceIds[i]

                await tx.business_profile_marketing_reaches.create({
                    data: {
                        business_profile_id: data.id,
                        marketing_reach_id: marketingReachId,
                    },
                })
            }
        })
    }

    static async updateBusinessProfile(id, reqBody) {
        const foundUser = await UserRepository.findUserbyId(id)

        const foundBusinessProfile = await prisma.business_profiles.findFirst({
            where: { user_id: foundUser.id },
        })
        if (!foundBusinessProfile) {
            throw new ErrHandler(
                '404',
                'Data bussiness profile not found or not created.'
            )
        }

        let payload = {
            name: reqBody.name || foundBusinessProfile.name,
            harbor_id: reqBody.harbor_id || foundBusinessProfile.harbor_id,
            business_type_id:
                reqBody.business_type_id ||
                foundBusinessProfile.business_type_id,
            lama_usaha: reqBody.lama_usaha || foundBusinessProfile.lama_usaha,
            jenis_asset:
                reqBody.jenis_asset || foundBusinessProfile.jenis_asset,
            estimasi_nilai_asset:
                reqBody.estimasi_nilai_asset ||
                foundBusinessProfile.estimasi_nilai_asset,
            user_id: foundUser.id,
        }

        await prisma.business_profiles.update({
            where: { user_id: foundUser.id },
            data: payload,
        })

        return
    }

    static async getUserProfile(id) {
        const foundUser = await UserRepository.findUserProfileAndBussiness(id)

        return foundUser
    }

    static async updatePhoneNumber(reqBody, id) {
        const { old_phone_number, new_phone_number } = reqBody

        const foundPhoneNumber = await prisma.users.findFirst({
            where: {
                phone_number: old_phone_number,
            },
        })
        if (!foundPhoneNumber) {
            throw new ErrHandler(404, 'User phone number is not found.')
        }

        const response = await OtpauthUtil.generateOTP(new_phone_number)

        await prisma.users.update({
            where: {
                id,
            },
            data: {
                otp_code: response.data.data,
                otp_expired_at: new Date(),
            },
        })

        return { new_phone_number, otp: response.data.data }
    }

    static async verifyUpdatePhoneNumber(req, id) {
        const { otp } = req.body

        const foundUserOtp = await prisma.users.findFirst({
            where: {
                id,
            },
        })

        if (
            otp != foundUserOtp.otp_code &&
            new Date() > foundUserOtp.otp_expired_at
        ) {
            throw new ErrHandler(401, 'Otp code is not match or expired.')
        }

        const newPhoneNumber = req.cookies['phone_number']

        return await prisma.users.update({
            where: {
                id: foundUserOtp.id,
            },
            data: {
                phone_number: newPhoneNumber,
            },
        })
    }

    static async addBusinessAccount(reqBody, id) {
        const payload = {
            ...reqBody,
            user_id: id,
        }

        return await prisma.business_accounts.create({ data: payload })
    }

    static async getBusinessProfile(id) {
        return await prisma.users.findFirst({
            where: { id: id },
            select: {
                business_profiles: {
                    select: {
                        name: true,
                        business_types: true,
                        lama_usaha: true,
                        harbors: true,
                        estimasi_nilai_asset: true,
                        jenis_asset: true,
                    },
                },
                applications: {
                    select: {
                        alamat_usaha: true,
                        lama_siklus_usaha: true,
                        estimasi_omset_per_bulan: true,
                        estimasi_biaya_per_bulan: true,
                        estimasi_laba_per_bulan: true,
                        estimasi_biaya_rumah_tangga: true,
                    },
                },
            },
        })
    }
}

module.exports = ProfileService
