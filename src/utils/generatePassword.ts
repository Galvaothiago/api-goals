import { randomUUID }  from 'crypto'

export const generatePassword = (value?: '12' | 'full') => {
    let password = ''
    const uuid = randomUUID()
    
    switch (value) {
        case 'full':
            password = uuid.toString()

            break
    
        case '12':
            const uuidFirstTwelve = uuid.toString().slice(0, 12)
            password = uuidFirstTwelve

            break

        default:
            password = uuid.toString().slice(0, 6) // by default take six first caracters
    }

    return password.toUpperCase()
}
