import Image from 'next/image';
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils';

type SearchProps = {
  searchParams: {
    manufacturer?: string;
    model?: string;
    year?: number;
    fuel?: string;
    limit?: number;
  };
};

export default async function Home({ searchParams }: SearchProps) {
  const carsData = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    model: searchParams.model || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
  });

  const isDataEmpty =
    !Array.isArray(carsData) || carsData.length < 1 || !carsData;

  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalog</h1>
          <p>Explore the cars of your choice.</p>
        </div>
        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {carsData?.map((car, index) => (
                <CarCard car={car} key={index} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > carsData.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results.</h2>
            <p>{carsData?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
