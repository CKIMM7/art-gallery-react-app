import { createSlice, current } from '@reduxjs/toolkit';

const artsSlice = createSlice({
  name: 'arts',
  initialState: {
      pageNum: 1,
      pageNumSearch: 1,
      nextPage: false,
      arts: [],
      artist: [],
      categories:[],
      artistImage: '',
      searchValue: '',
      searchedValues: [],
      textInput: '' ,
      searchArray: [],
      isLoading: false,
      isError: false,
      error: {},
      params: ''
  },
  reducers: {

    setSearchedValues(state, action) {
      if (!state.searchedValues.includes(action.payload)) {
        state.searchedValues.push(action.payload)

      }

    },

    setParams(state, action) {
      state.params = action.payload
    },

    setPageNumSearch(state, action) {
      state.pageNumSearch = state.pageNumSearch + action.payload
    },

    setPageNum(state, action) {
      state.pageNum = state.pageNum + action.payload
    },

    getMoreArts(state, action) {

        state.nextPage = !state.nextPage
      },

    setArts(state, action) {

        state.arts = action.payload
      },

    setArtist(state, action) {

        state.artist = action.payload
    },

    setCategories(state, action) {

      state.categories = action.payload
    },

    setArtistImage(state, action) {

      state.artistImage = action.payload
    },

    setTextInput(state, action) {

      state.textInput = action.payload
    },
  
    setSearchValue(state, action) {

      state.searchValue = action.payload
    },

    setSearchArray(state, action) {

      state.searchArray = action.payload
    },

    setIsLoading(state, action) {

      state.isLoading = action.payload
    },

    setIsError(state, action) {
      //console.log(action.payload)
      state.isError = action.payload
    },

    setError(state, action) {

      state.error = action.payload
    }

  },
});

export const artsActions = artsSlice.actions;

export default artsSlice;
