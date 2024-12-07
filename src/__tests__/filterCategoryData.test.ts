
import { filterCategoryData } from "@/helpers/filterCategoryData";
import { MOCK_RINGS_COLLECTION } from "./mocks";

jest.mock('@/helpers/filterCategoryData', () => ({ 
    filterCategoryData: jest.fn(), 
}));

