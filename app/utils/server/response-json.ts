enum ResCode {
	success,
	fail,
}

enum ResMessage {
	succes = "success",
	fail = "fail",
}

enum InnerMessage {
	PresentationMode = "演示模式：仅能进行获取",
	UnAuth = "未授权",
	Unsupport = "暂不支持",
}

export class Rps {
	/**
	 * 响应 JSON 成功
	 * @param data
	 * @param message
	 * @returns
	 */
	rsj(data: any, message?: string, options?: any) {
		return new Response(
			JSON.stringify({
				code: ResCode.success,
				message: message ?? ResMessage.succes,
				data,
			}),
			options,
		);
	}

	/**
	 * 响应 JSON 失败
	 * @param data
	 * @param message
	 * @param options
	 * @returns
	 */
	rfj(data?: any, message?: string, options?: any) {
		return new Response(
			JSON.stringify({
				code: ResCode.fail,
				message: message ?? ResMessage.fail,
				data: data ?? null,
			}),
		);
	}
}

export const rps = new Rps();

/**
 * 响应 JSON 成功
 * @param data
 * @param message
 * @returns
 */
export const rsj = (data: any, message?: string, options?: any) => {
	return new Response(
		JSON.stringify({
			code: ResCode.success,
			message: message ?? ResMessage.succes,
			data,
		}),
		options,
	);
};

/**
 * 响应 JSON 失败
 * @param data
 * @param message
 * @param options
 * @returns
 */
export const rfj = (data?: any, message?: string, options?: any) => {
	return new Response(
		JSON.stringify({
			code: ResCode.fail,
			message: message ?? ResMessage.fail,
			data: data ?? null,
		}),
	);
};

/**
 * 更具数据进行响应
 * @param data
 * @returns
 */
export const respByData$ = async (data: any | null) => {
	return data !== null
		? () => rsj(data, "创建成功")
		: () => rfj({}, "创建失败");
};

/**
 * 更具数据进行响应
 * @param data
 * @returns
 */
export const resp$ = async (data$: Promise<any> | any) => {
	const data = await data$;
	return data !== null ? rsj(data) : rfj({});
};

/**
 * 更具数据进行响应
 * @param data
 * @returns
 */
export const resp = async (data: any | null) => {
	return data !== null ? rsj(data) : rfj({});
};

/**
 * 函数响应
 * @param data
 * @returns
 */
export const respFn$ = async (
	resultFn$: Promise<() => Response> | (() => Response),
) => {
	const resultFn = await resultFn$;
	return resultFn();
};

/**
 * 响应样式模式
 * @returns
 */
export const respPresentationModeJson = () => {
	return Response.json({
		code: ResCode.fail,
		message: InnerMessage.PresentationMode,
		data: {},
	});
};

/**
 * 响应未授权
 * @returns
 */
export const respUnAuthJson = () => {
	return Response.json({
		code: ResCode.fail,
		message: InnerMessage.UnAuth,
		data: {},
	});
};

/**
 * 响应不支持
 * @returns
 */
export const respUnSupportJson = () => {
	return Response.json({
		code: ResCode.fail,
		message: InnerMessage.Unsupport,
		data: {},
	});
};

export const HigherOrderCreateRespWithTime =
	(data: any, startTimeStamp?: number, code?: boolean, message?: string) =>
	() => {
		const idata: any = {
			code: code ?? 0,
			data,
			message: message ?? "success",
		};
		if (startTimeStamp) {
			data.time = Date.now() - startTimeStamp;
		}
		return idata;
	};
