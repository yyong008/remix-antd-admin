import { type JWTPayload, SignJWT, jwtVerify } from "jose";

import { type LoaderFunctionArgs } from "react-router";

class JoseJwt {
	_secretKey: string;
	_encodedKey: Uint8Array;
	_alg = "HS256";
	_tokenExpTime = "15min";
	_refreshTokenExpTime = "7d";

	constructor() {
		this._secretKey = process.env.JWT_SECRET!;
		this._encodedKey = new TextEncoder().encode(this._secretKey);
	}

	/**
	 * jose jwt 编码
	 * @param payload
	 * @param expTime
	 * @returns
	 */
	async encrypt(payload: any, expTime: string) {
		return new SignJWT(payload)
			.setProtectedHeader({ alg: this._alg })
			.setIssuedAt()
			.setExpirationTime(expTime)
			.sign(this._encodedKey);
	}

	/**
	 * jost jwt 解码
	 * @param token
	 * @returns
	 */
	async decrypt(token: string) {
		try {
			const { payload } = await jwtVerify(token, this._encodedKey, {
				algorithms: [this._alg],
			});
			return { payload };
		} catch (error: any) {
			console.error("❌ Failed to verify >>", error);
			return { error };
		}
	}

	/**
	 * 从 token 中获取 userId
	 * @param args
	 * @returns
	 */
	async getTokenUserIdByArgs(args: LoaderFunctionArgs) {
		const token = args.request.headers.get("Authorization")?.split(" ")[1];
		type ResultType = JWTPayload & { userId: number; error: any };
		try {
			const { payload } = await jwtVerify(token!, this._encodedKey, {
				algorithms: [this._alg],
			});
			return { ...payload } as ResultType;
		} catch (error: any) {
			if (error?.code === "ERR_JWT_EXPIRED") {
				throw Error('"exp" claim timestamp check failed');
			}
			console.error("❌ Failed to verify >>", error);
			return { error } as ResultType;
		}
	}

	/**
	 * 从 token 中获取 payload
	 * @param token
	 * @returns
	 */
	async getPayloadByToken(token: string) {
		try {
			const { payload } = await jwtVerify(token!, this._encodedKey, {
				algorithms: [this._alg],
			});
			return { payload };
		} catch (error) {
			console.error("❌ Failed to verify >>", error);
			return { error };
		}
	}

	/**
	 * 使用 userId 签发 token
	 * @param userId
	 * @returns
	 */
	signToken(userId: number) {
		return this.encrypt({ userId }, this._tokenExpTime);
	}

	/**
	 * 使用 userId 签发 refresh token
	 * @param userId
	 * @returns
	 */
	signRefreshToken(userId: number) {
		return this.encrypt({ userId }, this._refreshTokenExpTime);
	}
}

export const joseJwt = new JoseJwt();
