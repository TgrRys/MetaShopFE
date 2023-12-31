import { Navbar } from "../Navbar";

export const Header = () => {
    return (
      <header className="sticky top-0 z-50 w-full bg-background">
        <Navbar />
      </header>
    );
  };

// import { Link } from "react-router-dom";

// const Header = () => {
//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background py-3">
//       <nav className="container px-2 sm:px-4 lg:px-6 flex items-center justify-between">
//         <div className="flex lg:hidden">
//           <button
//             className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
//             type="button"
//             aria-haspopup="dialog"
//             aria-expanded="false"
//             aria-controls="radix-:R2rqla:"
//             data-state="closed"
//           >
//             {/* Replace this with your menu icon */}
//             <span className="sr-only">Toggle Menu</span>
//           </button>
//         </div>
//         <div className="hidden lg:flex gap-x-8 items-center">
//           <Link className="flex space-x-2" to="/">
//             {/* Replace this with your logo */}
//             <span className="hidden font-bold lg:inline-block">Skaters</span>
//             <span className="sr-only">Home</span>
//           </Link>
//           <nav
//             aria-label="Main"
//             data-orientation="horizontal"
//             dir="ltr"
//             className="relative z-10 flex max-w-max flex-1 items-center justify-center"
//           >
//             {/* Navigation items go here */}
//           </nav>
//         </div>
//         <div className="flex items-center gap-x-2">
//           <button className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2">
//             {/* Replace this with your search icon */}
//             <span className="hidden xl:inline-flex">Search products...</span>
//             <span className="sr-only">Search products</span>
//           </button>
//           <Link
//             className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 before:ease relative overflow-hidden bg-emerald-600 text-white transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-1000 hover:before:-translate-x-40 duration-700 h-9 rounded-full px-3"
//             to="/sign-in"
//           >
//             Sign In<span className="sr-only">Sign In</span>
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;

{
  /* <header class="sticky top-0 z-50 w-full border-b bg-background py-3"><nav class="container px-2 sm:px-4 lg:px-6 flex items-center justify-between"><div class="flex lg:hidden"><button class="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:R2rqla:" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg><span class="sr-only">Toggle Menu</span></button></div><div class="hidden lg:flex gap-x-8 items-center"><a class="flex space-x-2" href="/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="7" cy="15" r="2"></circle><circle cx="17" cy="15" r="2"></circle><path d="M3 9a2 1 0 0 0 2 1h14a2 1 0 0 0 2 -1"></path></svg><span class="hidden font-bold lg:inline-block">Skaters</span><span class="sr-only">Home</span></a><nav aria-label="Main" data-orientation="horizontal" dir="ltr" class="relative z-10 flex max-w-max flex-1 items-center justify-center"><div style="position:relative"><ul data-orientation="horizontal" class="group flex flex-1 list-none items-center justify-center space-x-1" dir="ltr"><li><button id="radix-:Rkrqla:-trigger-radix-:Rbkrqla:" data-state="closed" aria-expanded="false" aria-controls="radix-:Rkrqla:-content-radix-:Rbkrqla:" class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group" data-radix-collection-item="">Lobby<!-- --> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button></li><li><button id="radix-:Rkrqla:-trigger-radix-:Rjkrqla:" data-state="closed" aria-expanded="false" aria-controls="radix-:Rkrqla:-content-radix-:Rjkrqla:" class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group" data-radix-collection-item="">Categories<!-- --> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button></li></ul></div><div class="absolute left-0 top-full flex justify-center"></div></nav></div><div class="flex items-center gap-x-2"><button class="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 xl:mr-2" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg><span class="hidden xl:inline-flex">Search products...</span><span class="sr-only">Search products</span><kbd class="pointer-events-none absolute right-2 top-2 hidden h-6 select-none items-center gap-1 rounded-full border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex"><abbr title="Control" class="no-underline">Ctrl</abbr>K</kbd></button><a class="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 before:ease relative overflow-hidden bg-emerald-600 text-white transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-1000 hover:before:-translate-x-40 duration-700 h-9 rounded-full px-3" href="/sign-in">Sign In<span class="sr-only">Sign In</span></a></div></nav></header> */
}
