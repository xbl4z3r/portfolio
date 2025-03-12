export const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <main className="container mx-auto max-w-7xl p-6 grow h-full">
            <footer className="footer flex items-center justify-center bg-background">
                <a className="text-black/40 dark:text-white/20 text-lg" href="/">
                    Copyright © {year} xbl4z3r's development
                </a>
            </footer>
        </main>
    );
}