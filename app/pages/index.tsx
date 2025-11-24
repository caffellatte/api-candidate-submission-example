import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "~/app/config/site";
import { title, subtitle } from "~/app/components/primitives";
import { GithubIcon } from "~/app/components/icons";
import DefaultLayout from "~/app/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Minimal&nbsp;</span>
          <span className={title({ color: "violet" })}>example&nbsp;</span>
          <br />
          <span className={title()}>
            of a app that submits a candidate application
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            to an API endpoint using <code>multipart/form-data</code>.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href="/form"
          >
            Application Form
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
