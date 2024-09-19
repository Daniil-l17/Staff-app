export const Home = () => {
	return (
		<div className=' m-auto w-full max-w-[1100px] px-5 flex items-center min-h-[800px]'>
			<div className=' flex flex-col flex-1 px-4'>
				<h2 className=' text-4xl font-semibold text-wrap max-w-[600px]'>Удобное приложение для контроля сотрудников</h2>
				<p className=' mt-3 text-[#6f6f6f] font-semibold'>Добавляйте новых сотрудников, обновляйте информацию о них и удаляйте</p>
			</div>
			<div className="w-[350px] h-[350px] bg-no-repeat bg-cover bg-center bg-[url('/3.png')] "></div>
		</div>
	);
};
