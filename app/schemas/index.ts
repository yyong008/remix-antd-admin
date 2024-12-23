import { z } from "zod";

const adminSchemas = {
  blog: {
    blog: {
      CREATE: z.object({
        title: z.string(),
        author: z.string(),
        source: z.string(),
        content: z.string(),
        publishedAt: z.string(),
        categoryId: z.number(),
        tagId: z.number(),
      }),
      UPDATE: z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
    category: {
      CREATE: z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
      UPDATE: z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
    tag: {
      CREATE: z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
      UPDATE: z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
  },
  news: {
    news: {
      CREATE: z.object({
        title: z.string(),
        content: z.string(),
        author: z.string().optional(),
        source: z.string().optional(),
        viewCount: z.number(),
        publishedAt: z.date(),
        newsId: z.string(),
        userId: z.string(),
      }),
      UPDATE: z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
        author: z.string().optional(),
        source: z.string().optional(),
        viewCount: z.number(),
        publishedAt: z.date(),
        newsId: z.string(),
        userId: z.string(),
      }),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
    category: {
      CREATE: z.object({
        name: z.string(),
        description: z.string(),
        userId: z.string(),
      }),
      UPDATE: z.object({
        name: z.string(),
        description: z.string(),
        userId: z.string(),
      }),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
  },
  system: {
    user: {
      CREATE: z.object({
        name: z.string(),
        avatar: z.string().optional(),
        password: z.string().optional(),
        email: z.string().email().optional(),
        roles: z.array(z.number()),
        departmentId: z.number(),
        nickname: z.string().optional(),
        phone: z.string().optional(),
        lang: z.string().optional(),
        theme: z.string().optional(),
        remark: z.string().optional(),
        status: z.number().optional(),
      }),
      UPDATE: z.object({
        id: z.number(),
        name: z.string(),
        avatar: z.string(),
        password: z.string().optional(),
        email: z.string().email().optional(),
        roles: z.array(z.number()),
        dept: z.number(),
        nickname: z.string().optional(),
        phone: z.string().optional(),
        lang: z.string().optional(),
        theme: z.string().optional(),
        remark: z.string().optional(),
        status: z.number().optional(),
      }),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
        name: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
    role: {
      CREATE: z.object({
        value: z.string(),
        name: z.string(),
        description: z.string().optional(),
        remark: z.string().optional(),
        status: z.number(),
        menus: z.array(
          z.object({
            key: z.number().optional(),
            value: z.number().optional(),
            id: z.number(),
          }),
        ),
      }),
      UPDATE: z.object({
        id: z.number(),
        value: z.string(),
        name: z.string(),
        description: z.string().optional(),
        remark: z.string().optional(),
        status: z.number(),
        menus: z.array(
          z.object({
            key: z.number().optional(),
            value: z.number().optional(),
            id: z.number(),
          }),
        ),
      }),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
    menuRole: {
      CREATE: z.object({}),
      UPDATE: z.object({}),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
    menu: {
      CREATE: z.object({}),
      UPDATE: z.object({}),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
    dept: {
      CREATE: z.object({
        name: z.string(),
        description: z.string(),
        orderNo: z.number().optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
        parentDepartmentId: z.number().optional(),
      }),
      UPDATE: z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        orderNo: z.number().optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
        parentDepartmentId: z.number().optional(),
      }),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
    dict: {
      CREATE: z.object({
        name: z.string(),
        code: z.string(),
        description: z.string().optional(),
        remark: z.string().optional(),
        status: z.number(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      }),
      UPDATE: z.object({
        id: z.number(),
        name: z.string(),
        code: z.string(),
        description: z.string().optional(),
        remark: z.string().optional(),
        status: z.number(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      }),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
    dictItem: {
      CREATE: z.object({
        key: z.string(),
        value: z.string(),
        orderNo: z.number(),
        status: z.number(),
        remark: z.string().optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
        dictionaryId: z.number(),
      }),
      UPDATE: z.object({
        id: z.number(),
        key: z.string(),
        value: z.string(),
        orderNo: z.number(),
        status: z.number(),
        remark: z.string().optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
        dictionaryId: z.number(),
      }),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
    monitor: {
      serve: {
        CREATE: z.object({}),
        UPDATE: z.object({}),
        READ: z.object({
          id: z.number(),
        }),
        READ_LIST: z.object({
          page: z.string().optional(),
          pageSize: z.string().optional(),
        }),
        DELETE: z.object({
          ids: z.array(z.number()),
        }),
      },
      loginlog: {
        CREATE: z.object({
          name: z.string(),
          ip: z.string().optional(),
          address: z.string().optional(),
          browser: z.string().optional(),
          system: z.string().optional(),
        }),
        UPDATE: z.object({
          id: z.number(),
          name: z.string(),
          ip: z.string().optional(),
          address: z.string().optional(),
          browser: z.string().optional(),
          system: z.string().optional(),
        }),
        READ: z.object({
          id: z.number(),
        }),
        READ_LIST: z.object({
          page: z.string().optional(),
          pageSize: z.string().optional(),
        }),
        DELETE: z.object({
          ids: z.array(z.number()),
        }),
      },
    },
    config: {
      CREATE: z.object({}),
      UPDATE: z.object({}),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
  },
  tools: {
    mail: {
      CREATE: z.object({
        name: z.string().optional(),
        title: z.string().optional(),
        host: z.string().optional(),
        port: z.string().optional(),
        user: z.string().optional(),
        pass: z.string().optional(),
        from: z.string().optional(),
        to: z.string().optional(),
        subject: z.string().optional(),
        content: z.string().optional(),
        html: z.string().optional(),
        text: z.string().optional(),
      }),
      UPDATE: z.object({
        id: z.number(),
        name: z.string().optional(),
        title: z.string().optional(),
        host: z.string().optional(),
        port: z.string().optional(),
        user: z.string().optional(),
        pass: z.string().optional(),
        from: z.string().optional(),
        to: z.string().optional(),
        subject: z.string().optional(),
        content: z.string().optional(),
        html: z.string().optional(),
        text: z.string().optional(),
      }),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
    storage: {
      CREATE: z.object({
        type: z.string(),
        size: z.string(),
        path: z.string(),
        extName: z.string(),
        fileName: z.string(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
        userId: z.number(),
      }),
      UPDATE: z.object({
        id: z.number(),
        type: z.string(),
        size: z.string(),
        path: z.string(),
        extName: z.string(),
        fileName: z.string(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
        userId: z.number(),
      }),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
  },
  docs: {
    changelog: {
      CREATE: z.object({}),
      UPDATE: z.object({}),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
    feedback: {
      CREATE: z.object({}),
      UPDATE: z.object({}),
      READ: z.object({
        id: z.number(),
      }),
      READ_LIST: z.object({
        page: z.string().optional(),
        pageSize: z.string().optional(),
      }),
      DELETE: z.object({
        ids: z.array(z.number()),
      }),
    },
  },
  profile: {
    account: {
      READ: z.object({
        id: z.number(),
      }),
    },
    link: {
      link: {
        CREATE: z.object({
          name: z.string(),
          url: z.string(),
          description: z.string().optional(),
          categoryId: z.number(),
        }),
        UPDATE: z.object({
          id: z.number(),
          name: z.string(),
          url: z.string(),
          description: z.string().optional(),
          categoryId: z.number(),
        }),
        READ: z.object({
          id: z.number(),
        }),
        READ_LIST: z.object({
          page: z.string().optional(),
          pageSize: z.string().optional(),
        }),
        DELETE: z.object({
          ids: z.array(z.number()),
        }),
      },
      linkCategory: {
        CREATE: z.object({
          name: z.string(),
          description: z.string().optional(),
          userId: z.number(),
        }),
        UPDATE: z.object({
          id: z.number(),
          name: z.string(),
          description: z.string().optional(),
          userId: z.number(),
        }),
        READ: z.object({
          id: z.number(),
        }),
        READ_LIST: z.object({
          page: z.string().optional(),
          pageSize: z.string().optional(),
        }),
        DELETE: z.object({
          ids: z.array(z.number()),
        }),
      },
    },
  },
  upload: {
    CREATE: z.object({
      file: z.any(),
    }),
  },
};

const adminAuthSchemas = {
  login: {
    CREATE: z.object({
      username: z.string(),
      password: z.string(),
    }),
  },
  refresh_token: {
    CREATE: z.object({
      refresh_token: z.string(),
    }),
  },
  register: {
    CREATE: z.object({
      username: z.string(),
      password: z.string(),
      passwordRe: z.string(),
    }),
  },
};

export const schemas = {
  admin: adminSchemas,
  adminAuth: adminAuthSchemas,
};
