import { Link, useParams } from "react-router";
import { Separator } from "@workspace/ui/components/separator";
import { IconBrandGithub, IconBrandX, IconBrandDiscord, IconBrandYoutube, IconExternalLink } from "@tabler/icons-react";

import { defaultLang } from "~/config/lang";
import { getLinks } from "~/config/links";
import { PRODUCT_NAME } from "~/config/product";
import * as m from "~/paraglide/messages.js";

export function NavFooter() {
  const { locale } = useParams();
  const data = getLinks(locale ?? defaultLang);

  return (
    <footer className="text-foreground">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Logo"
                className="size-10 rounded-lg object-contain"
              />
              <h4 className="text-lg font-semibold m-0">{PRODUCT_NAME}</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              {m.footer_tagline()}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex justify-end gap-16">
              {data.map((section, index) => (
                <div key={index}>
                  <div className="text-sm font-semibold text-foreground mb-3">
                    {section.title}
                  </div>
                  <div className="flex flex-col gap-2">
                    {section.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        to={link.to}
                        target={link.isOut ? "_blank" : "_self"}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <span className="flex items-center gap-1">
                          <span>{link.text}</span>
                          {link.isOut && <IconExternalLink className="size-3" />}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-7" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>&copy;</span>
            {new Date().getFullYear()} {PRODUCT_NAME}. {m.footer_rights()}
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            {m.footer_made_with({ product: PRODUCT_NAME })}
          </p>
        </div>
      </div>
    </footer>
  );
}

const socialLinks = [
  {
    icon: <IconBrandGithub className="size-5" />,
    label: "GitHub",
    url: "https://github.com/yyong008/remix-antd-admin",
  },
  { icon: <IconBrandX className="size-5" />, label: "Twitter", url: "https://twitter.com" },
  { icon: <IconBrandDiscord className="size-5" />, label: "Discord", url: "https://discord.com" },
  { icon: <IconBrandYoutube className="size-5" />, label: "YouTube", url: "https://youtube.com" },
];
