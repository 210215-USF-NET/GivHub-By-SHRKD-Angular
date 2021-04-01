import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  indexedArray: {[key: string]:string} = {
    'foo': "bar",
    'boo': "thang",
    'Arts, Culture and Humanities': "A",
    'Educational Institutions and Related Activities':"B",
    "Environmental Quality, Protection and Beautification":"C",
    "Animal-Related":"D",
    "Health - General and Rehabilitative":"E",
    "Mental Health, Crisis Intervention":"F",
    "Diseases, Disorders, Medical Disciplines":"G",
    "Medical Research":"H",
    "Crime, Legal-Related":"I",
    "Employment, Job-Related":"J",
    "Food, Agriculture and Nutrition":"K",
    "Housing, Shelter":"L",
    "Public Safety, Disaster Preparedness and Relief":"M",
    "Recreation, Sports, Leisure, Athletics":"N",
    "Youth Development":"O",
    "Human Services - Multipurpose and Other":"P",
    "International, Foreign Affairs and National Security":"Q",
    "Civil Rights, Social Action, Advocacy":"R",
    "Community Improvement, Capacity Building":"S",
    "Philanthropy, Voluntarism and Grantmaking Foundations":"T",
    "Science and Technology Research Institutes, Services":"U",
    "Social Science Research Institutes, Services":"V",
    "Public, Society Benefit - Multipurpose and Other":"W",
    "Religion-Related, Spiritual Development":"X",
    "Mutual\/Membership Benefit Organizations, Other":"Y",
    "Unknown":"Z"
  }
  constructor() { }
}
