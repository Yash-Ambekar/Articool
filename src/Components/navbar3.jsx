/* This example requires Tailwind CSS v2.0+ */

import { Disclosure } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import logo from "./Phymii_logo_3.png"
import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Authors', href: '/Authors'},
  { name: 'About', href: '/About' },
]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Example() {

    const { currentUser, logOut } = useAuth();
    var currentHref = window.location.pathname;
    const handleLogout = async () => {
    await logOut();
  };

  
  return (
    <Disclosure
      as="nav"
      className="container-fluid sticky top-0 z-50 bg-sky-200"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-20">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="lg:block h-15 w-auto"
                    src={logo}
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-3 NavElements">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.href === currentHref
                            ? "no-underline bg-black text-white"
                            : "no-underline text-black hover:bg-gray-400 hover:text-white",
                          "no-underline px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={
                          item.href ===currentHref ? "page" : undefined
                        }
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button type="button">
                  <span className="sr-only">View notifications</span>
                  <BellIcon
                    className="hidden md:block h-6 w-6"
                    aria-hidden="true"
                  />
                </button>

                {/* Profile dropdown */}

                <div className="flex ml-2">
                  <span className="sr-only">Open user menu</span>
                  {currentUser ? (
                    <>
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName}
                        className="hidden md:flex m-3 h-10 rounded-circle items-center "
                      />
                      <Button
                        variant="outline-info"
                        style={{
                          height: "40px",
                          fontSize: "17px",
                          fontWeight: "bold",
                        }}
                        onClick={handleLogout}
                        className="m-auto"
                      >
                        Log Out
                      </Button>
                    </>
                  ) : (
                    <Link to="/Login" className="Link">
                      <Button
                        variant="outline-info"
                        style={{ fontSize: "17px", fontWeight: "bold" }}
                        className="m-auto"
                      >
                        LOG IN
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.href === currentHref
                      ? "no-underline bg-black text-white"
                      : "no-underline text-black hover:bg-gray-400 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.href === currentHref ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
