import {SpoTuyaLogo} from "@/components/icons";

export const siteConfig = {
    url: "https://xbl4z3r.me",
    name: "xbl4z3r's development",
    description: "Make better software, together.",
    pages: {
        portfolio: {
            title: "xbl4z3r",
            navItems:
                [
                    {
                        label: "Home",
                        href: "/#home",
                    },
                    {
                        label: "About Me",
                        href: "/#about",
                    },
                    {
                        label: "Skills",
                        href: "/#skills",
                    },
                    {
                        label: "Projects",
                        href: "/#projects",
                    },
                ]
        },
        hyperbot: {
            title: "HyperBot",
            icon: <img src="/hyperbot.png" alt="logo" className="h-10 w-auto"/>,
            navItems: [
                {
                    label: "Home",
                    href: "/hyperbot#home",
                },
                {
                    label: "About",
                    href: "/hyperbot#about",
                },
                {
                    label: "Features",
                    href: "/hyperbot#features",
                },
                {
                    label: "Commands",
                    href: "/hyperbot#commands",
                },
                {
                    label: "Invite",
                    href: "/hyperbot/invite",
                },
            ],
        },
        hyperclient: {
            title: "HyperClient",
            icon: <img src="/hyperclient.png" alt="logo" className="h-10 w-auto"/>,
            navItems: [
                {
                    label: "Home",
                    href: "/hyperclient#home",
                },
                {
                    label: "Features",
                    href: "/hyperclient/#features",
                },
                {
                    label: "Store",
                    href: "/hyperclient/store",
                },
            ],
        },
        spotuya: {
            title: "Spotuya",
            icon: <SpoTuyaLogo className="h-10 w-auto stroke-[#1db954]"/>,
            navItems: [
                {
                    label: "Home",
                    href: "/spotuya#home",
                },
                {
                    label: "About",
                    href: "/spotuya/#about",
                },
                {
                    label: "Download",
                    href: "/spotuya/download",
                },
            ],
        },
        sink: {
            title: "Sink",
            icon: <img src="/sink.png" alt="Sink logo" className="h-10 w-auto rounded-lg"/>,
            navItems: [
                {
                    label: "Home",
                    href: "/sink#home",
                },
                {
                    label: "Performance",
                    href: "/sink#performance",
                },
                {
                    label: "Features",
                    href: "/sink#features",
                },
                {
                    label: "Get Notified",
                    href: "/sink#notify",
                },
            ],
        }
    },
    links: {
        github: "/github",
        discord: "/discord",
        sponsor: "/sponsor",
        x: "/x",
    },
};
