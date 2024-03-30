import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-white">
            <h2 className="text-lg font-semibold mb-2">About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet velit sit amet turpis suscipit, ut mollis metus congue.</p>
          </div>
          <div className="text-white">
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Home</a></li>
              <li><a href="#" className="hover:text-gray-400">About</a></li>
              <li><a href="#" className="hover:text-gray-400">Services</a></li>
              <li><a href="#" className="hover:text-gray-400">Contact</a></li>
            </ul>
          </div>
          <div className="text-white">
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <p>123 Street Name, City, Country</p>
            <p>Email: example@example.com</p>
            <p>Phone: +1234567890</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
