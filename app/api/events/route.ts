import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageNumber = searchParams.get('page');
  const is_free = searchParams.get('is_free');
  const actual_since = searchParams.get('actual_since');
  const location = searchParams.get('location');
  const nextPageUrl = searchParams.get('next_page_url');
  const ids = searchParams.get('ids');
  const page_size = searchParams.get('page_size');

  try {
    const baseUrl = 'https://kudago.com/public-api/v1.4/events/';

    // Начинаем формировать параметры запроса
    const params = new URLSearchParams({
      ids: '',
      page_size: '',
      lang: '',
      fields: 'images,title,place,description,dates,site_url,tags,price,location,id',
      expand: '',
      categories: 'concert,party,festival',
      order_by: '',
      text_format: '',
    });

    // Добавляем остальные параметры, если они установлены
    if (ids) params.append('ids', ids);
    if (location) params.append('location', location);
    if (actual_since) params.append('actual_since', actual_since);
    if (is_free) params.append('is_free', is_free);
    if (pageNumber) params.append('page', pageNumber);
    if (page_size) params.append('page_size', page_size);

    // Формируем полный URL с параметрами
    const fullUrl = `${baseUrl}?${params}`;
    const res = await fetch(fullUrl);

    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Что-то пошло не так' }, { status: 400 });
  }
}
