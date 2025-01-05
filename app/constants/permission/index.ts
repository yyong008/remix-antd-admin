export const permissions = {
  admin: {
    dashboard: {
      READ: "dashboard:read",
    },
    about: {
      about: {
        READ: "about:read",
      },
    },
    blog: {
      blog: {
        READ_LIST: "blog:list",
        READ: "blog:read",
        CREATE: "blog:create",
        UPDATE: "blog:update",
        DELETE: "blog:delete",
      },
      category: {
        READ_LIST: "blog:category:list",
        READ: "blog:category:read",
        CREATE: "blog:category:create",
        UPDATE: "blog:category:update",
        DELETE: "blog:category:delete",
      },
      tag: {
        READ_LIST: "blog:tag:list",
        READ: "blog:tag:read",
        CREATE: "blog:tag:create",
        UPDATE: "blog:tag:update",
        DELETE: "blog:tag:delete",
      },
    },
    news: {
      news: {
        READ_LIST: "news:list",
        READ: "news:read",
        CREATE: "news:create",
        UPDATE: "news:update",
        DELETE: "news:delete",
      },
      category: {
        READ_LIST: "news:category:list",
        READ: "news:category:read",
        CREATE: "news:category:create",
        UPDATE: "news:category:update",
        DELETE: "news:category:delete",
      },
    },
    docs: {
      changelog: {
        READ_LIST: "docs:changelog:list",
        READ: "docs:changelog:read",
        CREATE: "docs:changelog:create",
        UPDATE: "docs:changelog:update",
        DELETE: "docs:changelog:delete",
      },
      feedback: {
        READ_LIST: "docs:feedback:list",
        READ: "docs:feedback:read",
        CREATE: "docs:feedback:create",
        UPDATE: "docs:feedback:update",
        DELETE: "docs:feedback:delete",
      },
    },
    tools: {
      mail: {
        READ_LIST: "tools:mail:list",
        READ: "tools:mail:read",
        CREATE: "tools:mail:create",
        UPDATE: "tools:mail:update",
        DELETE: "tools:mail:delete",
      },
      storage: {
        READ_LIST: "tools:storage:list",
        READ: "tools:storage:read",
        CREATE: "tools:storage:create",
        UPDATE: "tools:storage:update",
        DELETE: "tools:storage:delete",
      },
    },
    profile: {
      account: {
        READ_LIST: "profile:account:list",
        READ: "profile:account:read",
        CREATE: "profile:account:create",
        UPDATE: "profile:account:update",
        DELETE: "profile:account:delete",
      },
      link: {
        categoryLink: {
          READ_LIST: "profile:link:list",
          READ: "profile:link:read",
          CREATE: "profile:link:create",
          UPDATE: "profile:link:update",
          DELETE: "profile:link:delete",
        },
        category: {
          READ_LIST: "profile:link-category:list",
          READ: "profile:link-category:read",
          CREATE: "profile:link-category:create",
          UPDATE: "profile:link-category:update",
          DELETE: "profile:link-category:delete",
        },
      },
    },
    system: {
      config: {
        READ_LIST: "system:config:list",
        READ: "system:config:read",
        CREATE: "system:config:create",
        UPDATE: "system:config:update",
        DELETE: "system:config:delete",
      },
      dept: {
        READ_LIST: "system:dept:list",
        READ: "system:dept:read",
        CREATE: "system:dept:create",
        UPDATE: "system:dept:update",
        DELETE: "system:dept:delete",
      },
      dict: {
        READ_LIST: "system:dict:list",
        READ: "system:dict:read",
        CREATE: "system:dict:create",
        UPDATE: "system:dict:update",
        DELETE: "system:dict:delete",
      },
      dictItem: {
        READ_LIST: "system:dict-item:list",
        READ: "system:dict-item:read",
        CREATE: "system:dict-item:create",
        UPDATE: "system:dict-item:update",
        DELETE: "system:dict-item:delete",
      },
      menu: {
        READ_LIST: "system:menu:list",
        READ: "system:menu:read",
        CREATE: "system:menu:create",
        UPDATE: "system:menu:update",
        DELETE: "system:menu:delete",
      },
      menuRole: {
        READ_LIST: "system:menu-role:list",
        READ: "system:menu-role:read",
        CREATE: "system:menu-role:create",
        UPDATE: "system:menu-role:update",
        DELETE: "system:menu-role:delete",
      },
      monitor: {
        loginlog: {
          READ_LIST: "system:monitor:loginlog:list",
          READ: "system:monitor:loginlog:read",
          CREATE: "system:monitor:loginlog:create",
          UPDATE: "system:monitor:loginlog:update",
          DELETE: "system:monitor:loginlog:delete",
        },
        serve: {
          READ_LIST: "system:monitor:serve:list",
          READ: "system:monitor:serve:read",
          CREATE: "system:monitor:serve:create",
          UPDATE: "system:monitor:serve:update",
          DELETE: "system:monitor:serve:delete",
        },
        operate: {
          READ_LIST: "system:monitor:operate:list",
          READ: "system:monitor:operate:read",
          CREATE: "system:monitor:operate:create",
          UPDATE: "system:monitor:operate:update",
          DELETE: "system:monitor:operate:delete",
        },
      },
      role: {
        READ_LIST: "system:role:list",
        READ: "system:role:read",
        CREATE: "system:role:create",
        UPDATE: "system:role:update",
        DELETE: "system:role:delete",
      },
      user: {
        READ_LIST: "system:user:list",
        READ: "system:user:read",
        CREATE: "system:user:create",
        UPDATE: "system:user:update",
        DELETE: "system:user:delete",
      },
    },
  },
};
