
const Footer = () => {
  return (
    <footer className="bg-black py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-white text-sm">
            © 2024 Thready. All rights reserved.
          </p>
          <p className="text-white text-sm">
            Built by{" "}
            <a 
              href="https://x.com/thearulshah" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300 underline"
            >
              Arul Shah
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
