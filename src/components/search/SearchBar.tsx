// import React, { useState } from "react";
// import Paper from "@mui/material/Paper";
// import InputBase from "@mui/material/InputBase";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
// import { search } from "@/api"; // Ensure this path is correct
// import { Product } from "@/types";
// import { useTranslation } from "react-i18next";

// interface SearchBarProps {
//   setProducts: (products: Product[]) => void;
// }

// export const SearchBar: React.FC<SearchBarProps> = ({ setProducts }) => {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [expanded, setExpanded] = useState<boolean>(false);
//   const { t } = useTranslation();

//   const handleSearch = async () => {
//     try {
//       const result = await search(searchTerm);
//       setProducts(result.data); // Update the products state with the search results
//     } catch (error) {
//       console.error("Error searching products:", error);
//     }
//   };

//   const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter") {
//       event.preventDefault(); // Prevent default form submission
//       handleSearch();
//     }
//   };

//   return (
//     <Paper
//       component="form"
//       onSubmit={(e) => e.preventDefault()} // Prevent form submission
//       sx={{
//         p: "4px 4px",
//         display: "flex",
//         alignItems: "center",

//       }}
//       className="w-full"
//     >
//       <InputBase
//         sx={{ ml: 1, flex: 1 }}
//         placeholder={t('search.placeholder')}
//         inputProps={{ "aria-label": "search" }}
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         onKeyPress={handleKeyPress}
//       />
//       <IconButton
//         color="primary"
//         onClick={handleSearch}
//         sx={{ ml: 1 }}
//       >
//         <SearchIcon />
//       </IconButton>
//     </Paper>
//   );
// };
