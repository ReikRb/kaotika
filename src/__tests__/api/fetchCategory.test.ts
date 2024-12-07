import { fetchCategory } from "../../pages/api/shop/fetchCategory";
import { MOCK_HELMET_COLLECTION } from "./mocks_api";

jest.mock('../../pages/api/shop/fetchCategory', () => ({ 
  fetchCategory: jest.fn(), 
}));

describe('fetchCategory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the given category data successfully and return it', async () => {
    (fetchCategory as jest.Mock).mockResolvedValue(MOCK_HELMET_COLLECTION);

    const result = await fetchCategory('helmets');

    expect(result).toEqual(MOCK_HELMET_COLLECTION);
  });

  it('should handle 404 error gracefully', async () => {
    (fetchCategory as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await fetchCategory('not_a_collection');

    expect(result).toBeUndefined();
  });
});

