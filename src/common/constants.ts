import { SetMetadata } from "@nestjs/common"

export const jwtConstants = {
    secret: 'lmtx',
}


export const IS_PUBLIC_key = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_key, true)