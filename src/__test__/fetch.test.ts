import fetchMock from 'fetch-mock';

describe('fetch', () => {
  it('A', async () => {
    const data = {a: 'aefefaf'};
    fetchMock.mock('http://example.com', data);
    const res = await fetch('http://example.com');
    const d = await res.json();
    expect(data).toEqual(d);
    fetchMock.restore();
  })
});