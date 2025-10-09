import NavbarToggle from "./components/Navbar/NavbarToggle";

const NavbarWrapper = async () => {
  // const res = await fetch(`${process.env.BACKEND_URL}${COUNTRY_API}`, {
  //   cache: "no-store",
  // });

  // const countryData: Country[] = await res.json();

  // const countryOptions: OptionType[] = countryData.map((country) => {
  //   return {
  //     value: country.id.toString(),
  //     label: country.name,
  //   };
  // });

  return (
    <>
      <NavbarToggle />
    </>
  );
};

export default NavbarWrapper;
