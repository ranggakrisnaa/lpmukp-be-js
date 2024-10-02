const prisma = require('../../src/config/prisma.config')
const Application = require('./application')
const Bank = require('./bank')
const BusinessProfile = require('./business_profile')
const BusinessProfileEcommerce = require('./business_profile_ecommerce')
const BusinessProfileMarketingReach = require('./business_profile_marketing_reach')
const ComodityType = require('./comodity_type')
const BusinessType = require('./business_type')
const City = require('./city')
const District = require('./district')
const Ecommerce = require('./ecommerce')
const Harbor = require('./harbor')
const Installment = require('./installment')
const LoanInterest = require('./loan_interest')
const MarketingReach = require('./marketing_reach')
const PaymentMethod = require('./payment_method')
const Plafond = require('./plafond')
const Profile = require('./profile')
const Province = require('./province')
const Role = require('./role')
const User = require('./user')
const Village = require('./village')
const Wallet = require('./wallet')

async function seedAll() {
    await Application.main()
    await Bank.main()
    await BusinessProfileEcommerce.main()
    await BusinessProfileMarketingReach.main()
    await BusinessProfile.main()
    await BusinessType.main()
    await City.main()
    await District.main()
    await Ecommerce.main()
    await Harbor.main()
    await Installment.main()
    await LoanInterest.main()
    await MarketingReach.main()
    await PaymentMethod.main()
    await Plafond.main()
    await Profile.main()
    await Province.main()
    await Role.main()
    await User.main()
    await Village.main()
    await Wallet.main()
}

async function region() {
    await Province.main()
    await City.main()
    await District.main()
    await Village.main()
}

async function main() {
    const args = process.argv.slice(2)
    if (args.length < 1) {
        console.error('Usage: node seed.js <seeder file name>')
        process.exit(1)
    }

    const seederName = args[0]

    switch (seederName) {
        case 'all':
            await seedAll()
            break
        case 'application':
            await Application.main()
            break
        case 'bank':
            await Bank.main()
            break
        case 'business_profile_ecommerce':
            await BusinessProfileEcommerce.main()
            break
        case 'business_profile_marketing_reach':
            await BusinessProfileMarketingReach.main()
            break
        case 'business_profile':
            await BusinessProfile.main()
            break
        case 'business_type':
            await BusinessType.main()
            break
        case 'comodity_type':
            await ComodityType.main()
            break
        case 'city':
            await City.main()
            break
        case 'district':
            await District.main()
            break
        case 'ecommerce':
            await Ecommerce.main()
            break
        case 'harbor':
            await Harbor.main()
            break
        case 'installment':
            await Installment.main()
            break
        case 'loan_interest':
            await LoanInterest.main()
            break
        case 'marketing_reach':
            await MarketingReach.main()
            break
        case 'payment_method':
            await PaymentMethod.main()
            break
        case 'plafond':
            await Plafond.main()
            break
        case 'profile':
            await Profile.main()
            break
        case 'province':
            await Province.main()
            break
        case 'region':
            await region()
            break
        case 'role':
            await Role.main()
            break
        case 'user':
            await User.main()
            break
        case 'village':
            await Village.main()
            break
        case 'wallet':
            await Wallet.main()
            break
        default:
            console.error('Seeder not found:', seederName)
            process.exit(1)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
