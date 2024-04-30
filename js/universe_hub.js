const loadedData = async (isShowAll) => {
      try {
            const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
            const data = await res.json();
            const features = data.data.tools;
            displayFeatures(features, isShowAll)
      }
      catch (error) {
            console.log(error);
      }
}

const displayFeatures = (features, isShowAll) => {

      if (!isShowAll) {
            // firstly show only 6 features
            features = features.slice(0, 6);
      }

      document.getElementById('features-container').innerHTML = '';

      features.forEach(feature => {

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card border border-[#1111111a] p-5">
                  <figure class="mb-5">
                        <img src="${feature?.image}" alt="Shoes" class="rounded-lg h-64" />
                  </figure>
                  
                  <div class="">
                        <h2 class="card-title text-[#403F3F] text-2xl font-semibold mb-4">Features</h2>
                        <ul class="list-decimal list-inside">
                              <li class="text-[#585858] text-base font-normal">Natural language processing</li>
                              <li class="text-[#585858] text-base font-normal">Contextual understanding</li>
                              <li class="text-[#585858] text-base font-normal">Text generation</li>
                        </ul>
                        <hr class="my-5">
                        <div class="flex justify-between items-center">
                              <div>
                                    <h2 class="card-title text-[#403F3F] text-2xl font-semibold mb-2">ChatGPT</h2>
                                    <div class="flex gap-1 items-center">
                                          <img src="./images/date.svg" alt="">
                                          <span class="text-[#585858] font-medium">11/01/2022</span>
                                    </div>
                              </div>
                              <div onclick="handleFeatureDetails('${feature?.id}')" class="bg-[#FEF7F7] rounded-full p-3 cursor-pointer">
                                    <img src="./images/arrow.svg" alt="">
                              </div>
                        </div
                  </div>
            </div>
            `;

            document.getElementById('features-container').appendChild(div)
      });
}

function showAllFeatures() {
      document.getElementById('show-all-btn').classList.add('hidden')
      loadedData(true);
}

const handleFeatureDetails = async (id) => {
      const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
      const data = await res.json();
      const featureDetails = data.data;
      displayFeatureDetails(featureDetails);
}

const displayFeatureDetails = (featureDetails) => {

      document.getElementById('my_modal_4').innerHTML = '';

      const div = document.createElement('div');
      div.innerHTML = `
      <div class="modal-box w-11/12 max-w-7xl mx-auto relative p-10">
                  
            <div class="flex flex-col md:flex-col lg:flex-row justify-between gap-6">
                  <div class="rounded-2xl lg:w-[49%] p-8 border border-[#EB5757] bg-[#eb57570d]">
                        <p class="text-[#111] text-2xl font-semibold mb-5">${featureDetails?.description}</p>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                              <span class="flex items-center justify-center h-24 text-[#03A30A] text-base font-bold bg-white rounded-2xl px-6">${featureDetails?.pricing[0]?.price} ${featureDetails?.pricing[0]?.plan}</span>

                              <span class="flex items-center justify-center h-24 text-[#F28927] text-base font-bold bg-white rounded-2xl px-6">${featureDetails?.pricing[1]?.price} ${featureDetails?.pricing[1]?.plan}</span>

                              <span class="flex items-center justify-center h-24 text-[#EB5757] text-base font-bold bg-white rounded-2xl px-6">${featureDetails?.pricing[2]?.price} ${featureDetails?.pricing[2]?.plan}</span>
                        </div>

                        <div class="flex flex-col md:flex-row justify-between gap-1 my-4">
                              <div class="mb-5 md:mb-0">

                                    <h2 class="card-title text-[#403F3F] text-2xl font-semibold mb-2">Features</h2>

                                    <ul class="list-disc list-inside">
                                          <li class="text-[#585858] text-base font-normal">${featureDetails?.features['1']?.feature_name ? featureDetails?.features['1']?.feature_name : 'No data found'}</li>
                                          <li class="text-[#585858] text-base font-normal">${featureDetails?.features['2']?.feature_name ? featureDetails?.features['2']?.feature_name : 'No data found'}</li>
                                          <li class="text-[#585858] text-base font-normal">${featureDetails?.features['3']?.feature_name ? featureDetails?.features['3']?.feature_name : 'No data found'}</li>
                                    </ul>
                              </div>
                              <div>
                                    <h2 class="card-title text-[#403F3F] text-2xl font-semibold mb-2">Integrations
                                    </h2>
                                    <ul class="list-disc list-inside">
                                          <li class="text-[#585858] text-base font-normal">${featureDetails?.integrations[0] ? featureDetails?.integrations[0] : 'No data found'}</li>
                                          <li class="text-[#585858] text-base font-normal">${featureDetails?.integrations[1] ? featureDetails?.integrations[1] : 'No data found'}</li>
                                          <li class="text-[#585858] text-base font-normal">${featureDetails?.integrations[2] ? featureDetails?.integrations[2] : 'No data found'}</li>
                                    </ul>
                              </div>
                        </div>
                  </div>

                  <div class="rounded-2xl border border-[#E7E7E7] p-5 lg:w-[49%] flex flex-col">
                        <div class="mb-5 flex-1">
                              <img src="${featureDetails?.image_link[0]}"
                                          alt="" class="rounded-2xl w-full">

                        </div>
                        <div class="md:px-10">
                              <h2 class="text-[#403F3F] text-center text-2xl font-semibold mb-4">Hi, how are you
                                          doing today?
                              </h2>
                                    <p class="text-[#585858] text-center text-base font-normal">I'm doing well, thank
                                          you for asking. How can I assist you today?</p>
                        </div>
                  </div>
            </div>
            <div class="absolute top-2 right-2">
                   <form method="dialog">
                        <button class="btn btn-circle text-white hover:bg-[#EB5757] bg-[#EB5757]">✕</button>
                  </form>
            </div>

      </div>
      `;
      document.getElementById('my_modal_4').appendChild(div);

      my_modal_4.showModal()
}

loadedData();