import Image from "next/image";
import Link from "next/link";
import UserProfile from "./userProfile";
import goldIcon from "../../public/icons/gold-icon.png";

const Navbar = () => {
	return (
		<div className="h-20 bg-black/30 w-full flex items-center px-10 justify-between">
			<Link href={"/"}>
				<div className="w-48">
					<Image src={goldIcon} alt="icon" />
				</div>
			</Link>
			<UserProfile />
		</div>
	);
};

export default Navbar;
