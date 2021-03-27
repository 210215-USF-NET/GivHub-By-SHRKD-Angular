export interface nytapiDocs
{
    abstract: string,
    web_url: string,
    snippet: string,
    lead_paragraph: string,
    source: string,
    multimedia: nytapiMultimedia[],
    headline: nytapiHeadline,
    keywords: nytapiKeywords[],
    pub_date: string,
    document_type: string,
    news_desk: string,
    section_name: string,
    byline: nytapiByline,
    type_of_material: string,
    _id: string,
    word_count: number,
    uri: string,
}

interface nytapiMultimedia 
{
    rank: number,
    subtype: string,
    caption: string,
    credit: string,
    type: string,
    url: string,
    height: number,
    width: number,
    legacy: legacy,
    subType: string,
    crop_name: string
}

interface legacy
{
    xlarge: string,
    xlargewidth: number,
    xlargeheight: number
}

interface nytapiHeadline
{
    main: string,
    kicker: string,
    content_kicker: string,
    print_kicker: string,
    name: string,
    seo: string,
    sub: string
}

interface nytapiKeywords
{
    name: string,
    value: string,
    rank: number,
    major: string
}

interface nytapiByline
{
    original: string,
    person: nytapiPerson,
    organization: string
}

interface nytapiPerson
{
    firstname: string,
    middlename: string,
    lastname: string,
    qualifier: string,
    title: string,
    role: string,
    organization: string,
    rank: number
}