import { mailTemplateDAL } from "@/dals/tools/MailDAL";
import { urlSearchParams } from "@/utils/server/search";
// import { joseJwt } from "@/libs/jose";

class MailTemplateService {
  /**
   * 获取 id
   * @param args
   * @returns
   */
  async getById(args: any) {
    const id = Number(args.params.id);
    const result = await mailTemplateDAL.getById(id);
    return result;
  }

  /**
   * 获取列表
   * @param args
   * @returns
   */
  async getList(args: any) {
    // const payload = await joseJwt.getTokenUserIdByArgs(args);
    const page = urlSearchParams.getPage(args.request);
    const pageSize = urlSearchParams.getPageSize(args.request);
    // const categoryId = Number(getSearchParams(args.request, "category"))

    const total = await mailTemplateDAL.getCount();
    const list = await mailTemplateDAL.getList({
      where: {
        // id: payload.userId,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      list,
      total,
    };
  }
  /**
   * 创建邮件模板
   * @param args
   * @returns
   */
  async create(args: any) {
    const dto = await args.request.json();
    const result = await mailTemplateDAL.create(dto);
    return result;
  }
  /**
   * 根据 ids 删除邮件模板
   * @param args
   * @returns
   */
  async deleteByIds(args: any) {
    const dto = await args.request.json();
    const result = await mailTemplateDAL.deleteByIds(dto.ids);
    return result;
  }

  /**
   * 更新
   * @param args
   * @returns
   */
  async update(args: any) {
    const { id, ...dto } = await args.request.json();
    const result = await mailTemplateDAL.update(id, dto);

    return result;
  }
}

export const mailTemplateService = new MailTemplateService();
