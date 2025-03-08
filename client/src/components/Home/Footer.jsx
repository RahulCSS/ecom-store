import { InstagramOutlined, 
    YoutubeOutlined,
    XOutlined,
    FacebookOutlined 
} from "@ant-design/icons"

const Footer = () => {
return (
        <>
        <div className="flex justify-center h-96 px-16 
                        bg-white text-black gap-8 border-t-2 border-gray-300">
            <div className="text-6xl font-semibold pt-4">
                <p>Zip Store</p>
            </div>
            <div>
                <ul className="text-lg space-y-4 pt-2 w-56">
                    <li>
                        <p className="text-xl font-semibold pb-4">Menu</p>
                    </li>
                    <li>
                        <p>Products</p>
                    </li>
                    <li>
                        <p>New Launches</p>
                    </li>
                    <li>
                        <p>Shop by Category</p>
                    </li>
                </ul>
            </div>
            <div>
                <ul className="text-lg space-y-4 pt-2 w-56">
                    <li>
                        <p className="text-xl font-semibold pb-4">Account</p>
                    </li>
                    <li>
                        <p>Sign in</p>
                    </li>
                    <li>
                        <p>Manage My Account</p>
                    </li>
                    <li>
                        <p>My Orders</p>
                    </li>
                </ul>
            </div>
            <div>
                <ul className="text-lg space-y-4 pt-2 w-56">
                    <li>
                        <p className="text-xl font-semibold pb-4">Cunstomer Service</p>
                    </li>
                    <li>
                        <p>Terms & Conditions</p>
                    </li>
                    <li>
                        <p>Privacy Policy</p>
                    </li>
                    <li>
                        <p>Return & Replacement</p>
                    </li>
                    <li>
                        <p>Shipping Policy</p>
                    </li>
                    <li>
                        <p>Return Policy</p>
                    </li>
                    <li>
                        <p>Contact Us</p>
                    </li>
                    <li>
                        <p>About Us</p>
                    </li>
                </ul>
                </div>
            <div>
            <ul className="text-lg space-y-4 pt-2 w-56">
                    <li>
                        <p className="text-xl font-semibold pb-4">Social Media</p>
                    </li>
                    <li className="flex gap-4">
                        <InstagramOutlined className="text-3xl"/>
                        <p>Instagram</p>
                    </li>
                    <li className="flex gap-4">
                        <XOutlined className="text-3xl"/>
                        <p>Twitter</p>
                    </li>
                    <li className="flex gap-4">
                        <FacebookOutlined className="text-3xl"/>
                        <p>Facebook</p>
                    </li>
                    <li className="flex gap-4">
                        <YoutubeOutlined className="text-3xl"/>
                        <p>Youtube</p>
                    </li>
                    <li className="italic">
                        <p>Follow us in Social Media for latest updates on new launches and offers</p>
                    </li>
                </ul>
            </div>
        </div>
        <div className="border-t-2 border-gray-300">
            <p className="text-center text-lg py-4">© 2021 ZipStore. All Rights Reserved</p>
        </div>
        </>
)
}

export default Footer