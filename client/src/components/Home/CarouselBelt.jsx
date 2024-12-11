import React,{ useState, useRef } from 'react'

const images = [
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-lastly-699122.jpg?alt=media&token=b178384f-131e-4535-83a6-261a3f93f45e',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-morningtrain-18105.jpg?alt=media&token=a5d2054d-28ab-4551-8056-2b2436a2c4bd',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-pixabay-256450.jpg?alt=media&token=796f5f11-e47f-4815-96b7-c980606dbdef',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-pixabay-161449.jpg?alt=media&token=984363fc-7f3a-4f86-9297-a03c2994d82b',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-john-finkelstein-680076-1630588.jpg?alt=media&token=68488a04-2108-4421-9c92-3a447cba2440',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-janetrangdoan-1132047.jpg?alt=media&token=b53b5ad8-d849-4141-9c44-1dc7a9dbb2ba',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-kseniachernaya-3965557.jpg?alt=media&token=df9a4c1e-4fa8-4c11-93e0-4dd891aebcc8',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-thngocbich-636237.jpg?alt=media&token=5ba84dc2-4d14-4dff-b42f-193cbd91999b',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/category%2Fpexels-mdsnmdsnmdsn-2622187.jpg?alt=media&token=2772acd2-60f1-47b2-826b-bd95db0a6eba'
];

const categories = [
                    {name:"Phones",image:images[0]},
                    {name:"Laptop",image:images[1]},
                    {name:"Books",image:images[2]},
                    {name:"Medicine",image:images[3]},
                    {name:"Fruits",image:images[4]},
                    {name:"Vegitables",image:images[5]},
                    {name:"Clothing",image:images[6]},
                    {name:"Notebook",image:images[7]},
                    {name:"Skincare",image:images[8]},
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
        <h2 className="pt-2 text-[1.5rem]">What's on your Mind</h2>
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