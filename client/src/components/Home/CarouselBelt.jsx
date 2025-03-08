import React,{ useState, useRef } from 'react'

const images = [
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-lastly-699122.jpg?alt=media&token=b178384f-131e-4535-83a6-261a3f93f45e',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-morningtrain-18105.jpg?alt=media&token=a5d2054d-28ab-4551-8056-2b2436a2c4bd',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-kseniachernaya-3965557.jpg?alt=media&token=df9a4c1e-4fa8-4c11-93e0-4dd891aebcc8',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-pixabay-267301%20Large.jpeg?alt=media&token=1fd98e60-9097-43ec-afea-9eab502f632e',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fdm9qefzptw9gep3e33pFuK-1200-80.jpg?alt=media&token=895a5bb2-abf9-4beb-8c3c-8c8db04e4714',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fcq5dam.web.5000.5000.jpeg?alt=media&token=0e4dd9ff-7f7e-46f4-9914-f0b62bebde66',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Funtitled-design-59-66e410cc229bf.webp.jpeg?alt=media&token=20423404-ca8b-4615-98bb-f19d8f64022f',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-janetrangdoan-1132047.jpg?alt=media&token=b53b5ad8-d849-4141-9c44-1dc7a9dbb2ba',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Far-lays-taste-test-group-2x1-39ab5d565b9543939804683eebec2ec4.jpg?alt=media&token=a5267a3e-f5d3-4651-b3a6-048b93992c05',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fistockphoto-537532743-612x612.jpg?alt=media&token=b2d3a76b-9693-403a-abc4-949187cce652',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2FSkin-Center-of-South-Miami-Facials-and-Skin-Care.jpg?alt=media&token=fd8ce7d5-05eb-4f26-9a78-31494844bd7c',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fistockphoto-1365604058-612x612.jpg?alt=media&token=3e11a305-4363-431e-8821-ee2a166f10e6',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2F656782128eeaf56aed0a422c-bath-and-body-works-sweet-pea-body.jpg?alt=media&token=63fddbb9-e745-47ad-b297-a2513fa9eb3d',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-pixabay-256450.jpg?alt=media&token=796f5f11-e47f-4815-96b7-c980606dbdef',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-thngocbich-636237.jpg?alt=media&token=5ba84dc2-4d14-4dff-b42f-193cbd91999b',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2FFitness-and-Health.jpg?alt=media&token=d7a9b673-6047-46fb-a7b8-d87fc3a8e7ff',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-pixabay-161449.jpg?alt=media&token=984363fc-7f3a-4f86-9297-a03c2994d82b',
];

const categories = [
                    {name:"Phones",image:images[0]},
                    {name:"Laptops",image:images[1]},
                    {name:"Clothing",image:images[2]},
                    {name:"Footwear",image:images[3]},
                    {name:"Television",image:images[4]},
                    {name:"Air Conditioner",image:images[5]},
                    {name:"Refrigirator",image:images[6]},
                    {name:"Fruits & Vegetables",image:images[7]},
                    {name:"Snacks",image:images[8]},
                    {name:"Beverages",image:images[9]},
                    {name:"Skincare",image:images[10]},
                    {name:"Haircare",image:images[11]},
                    {name:"Bath & Body",image:images[12]},
                    {name:"Books",image:images[13]},
                    {name:"Office Supplies",image:images[14]},
                    {name:"Fitness",image:images[15]},
                    {name:"Supplements",image:images[16]},
];

const Categorybelt = () => {
    const [selectedCategory, setselectedCategory] = useState(null);
    const handleClick = (index) => {
        if(selectedCategory === index) setselectedCategory(null);
        else setselectedCategory(index);
    };
    //console.log(selectedCategory);

    {/* Scrollable menu to mouse drag */}
    const scrollContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };
    const handleMouseLeave = () => {
        setIsDragging(false);
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

  return (
    <div className='bg-white mb-2'>
        <h2 className="pt-2 pl-6 text-[1.5rem]">What's on your Mind</h2>
        <div className="relative flex overflow-x-auto py-2 hide-scrollbar"
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}>
            {categories.map((catergory,index)=>{
                return (
                    <div key={index}
                        className="flex flex-col flex-shrink-0 items-center text-center w-[10rem] h-[10rem]"
                    >
                        <img src={catergory.image} 
                            className={`w-[85%] h-[85%] object-cover rounded-full border border-gray-300 shadow-lg cursor-pointer 
                                ${selectedCategory === index ? 'border-dotted border-blue-900 border-2': ''}`}
                            onClick={()=>handleClick(index)}
                        />
                        <p className="text-center text-gray-700 font-medium cursor-pointer" onClick={()=>handleClick(index)}>{catergory.name}</p>
                    </div>
                )
            })}
        </div>
        <hr className="mx-[1rem] h-[2px] bg-[#e2e2e2] border-none"/>
    </div>
  )
}

export default Categorybelt