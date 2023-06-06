/// <reference path='globals/openlayers/index.d.ts' />

interface Array<T>
{
    find(callback: (element: T, index: number, array: Array<T>) => boolean);
}

declare namespace WazeNS
{
    export interface App {
        getAppRegionCode(): string;
        modeController: any;
        layout: any;
    }

    export interface DataModel
    {
        cities: Model.ObjectRepository<WazeNS.Modules.Cities.Model.City, number>;
        events: any;
        actionManager: any;
        junctions: Model.NumberRepository<WazeNS.Model.Object.Junction>;
        mapComments: Model.StringRepository<Model.Object.MapComment>;
        repositoryFilters: any;
        segments: Model.RepositoryOfSegments;
        segmentSuggestions: Model.NumberRepository<WazeNS.Model.Object.SegmentSuggestion>;
        streets: Model.NumberRepository<WazeNS.Model.Object.Street>;
        states: Model.NumberRepository<WazeNS.Model.Object.State>;
        venues: Model.VenueRepository;
        isLeftHand: boolean;
        lastTransactionID: string;
        managedAreas: Model.StringRepository<Model.Object.EditableArea>;
        addRepository(e: any, t: any, i: any, n: any): void;
        getTurnGraph(): Model.Graph.TurnGraph;
        users: Model.NumberRepository<WazeNS.Model.Object.User>;
    }

    export interface Controller
    {
        reload(): void;
        reloadData(): void;
        updateModel(e: any): void;
    }

    export interface ActionManager
    {
        canUndo(): boolean;
        undo(): void;
        add(e: any): void;
    }

    export interface LoginManager
    {
        events: any;
        expired: boolean;
        returningUser: boolean;
        user: Model.Object.LoggedInUser;
        getLoggedInUser(): any;
        hasUser: boolean;
        isLoggedIn: boolean;
        getUserRank(): number;
        isAdOperation: boolean;
        canEditPlaceUpdates: boolean;
        canEditAdLockedPlaceUpdated: boolean;
        canEditBigJunctions: boolean;
        login(e, t): void;
        getCsrfToken(): any;
        doLogin(e, t): any;
        logout(): void;
        CLASS_NAME: string;
    }

    export interface Map extends OpenLayers.Map
    {
        addUniqueLayer(layer: OpenLayers.Layer): void;
        getLayerByUniqueName(layer: string): OpenLayers.Layer.Vector;
        getLayerByName(layer: string): OpenLayers.Layer.Vector;
        setLayerVisibility(layer: string, state: boolean): void;
        zoomTo(zoomLevel: number): void;
        roadLayers: Array<OpenLayers.Layer.XYZ>;
        getOLMap(): OpenLayers.Map;
    }

    export interface SelectedItem extends WazeNS.Feature.Vector<string> {
        model: Feature.Vector<string>;
    }

    export interface SelectionManager {
        selectedItems: Array<SelectedItem>;
        events: OpenLayers.Events;
    }

    export interface Prefs {
        on(event: string, callback: any): void;
        attributes: {
            compactDensity: boolean;
            enableTurnsByDefault: boolean;
            isImperial: boolean;
            keepLastSelectedTab: boolean;
            requireFeatureDeselect: boolean;
            showDismissedAlerts: boolean;
            showTransparentTurnArrows: boolean;
            spreadTurnArrows: boolean;
            twoWaySegmentsByDefault: boolean;
        }
    }

    namespace Model
    {
        namespace Object
        {
            export interface Address {
                attributes: {
                    altStreets: Array<WazeNS.Model.Object.Street>;
                    city: WazeNS.Model.Object.City;
                    country: WazeNS.Model.Object.Country;
                    houseNumber: string;
                    isEmpty: boolean;
                    state: WazeNS.Model.Object.State;
                    street: WazeNS.Model.Object.Street;
                };
                getCity(): WazeNS.Model.Object.City;
                getCityName(): string;
                getCountry(): WazeNS.Model.Object.Country;
                getCountryName(): string;
                getHouseNumber(): string;
                getState(): WazeNS.Model.Object.State;
                getStateName(): string;
                hasState(): boolean;
                isEmpty(): boolean;
                isEmptyStreet(): boolean;
            }

            export interface City extends WazeNS.Model.Object<number>
            {
                attributes: {
                    countryID: number;
                    englishName: string;
                    isEmpty: boolean;
                    name: string;
                    permissions: number;
                    rank: number;
                    stateID: number;
                };
                getCountryID(): number;
                getEnglishName(): string;
                hasName(): boolean;
                getName(): boolean;
                isEmpty(): boolean;
            }

            export interface ModelCollection<T> {
                length: number;
                models: Array<T>;
            }

            export interface Comment {
                attributes: {
                    createdOn: number;
                    text: string;
                    userID: number;
                }
            }

            export interface Country extends WazeNS.Model.Object<number>
            {
                abbr: string;
                allowCamerasRank: number;
                allowNewCitiesRank: number;
                allowRoadClosureRank: number;
                allowSpeedCams: boolean;
                env: string;
                forceHouseNumberRank: number;
                leftHandTraffic: boolean;
            }

            export interface EditableArea extends WazeNS.Model.Object<string>
            {
                geometry: OpenLayers.Geometry;
                area: string;
                getUserName(): string;
            }

            export interface Junction extends WazeNS.Model.Object<number>
            {
                attributes: {
                    id: number;
                    segIDs: Array<number>
                };
                segIDs: Array<number>;
                getAllSegments(): Array<WazeNS.Model.Object<number>>
            }

            export interface MapComment extends Feature.Vector<string>
            {
                attributes: {
                    name: string;
                    labelText: string;
                    body: string;
                    createdBy: number;
                    createdOn: number;
                    endDate: string;
                    id: string;
                    lockRank: number;
                    subject: string;
                    updatedBy: number;
                    updatedOn: number;
                    geometry: OpenLayers.Geometry;
                };
                isPoint(): boolean;
                getPointGeometry(): OpenLayers.Geometry;
                getPolygonGeometry(): OpenLayers.Geometry;
                getComments(): ModelCollection<Comment>;
            }

            export interface NavigationPoint {
                entry: boolean;
                exit: boolean;
                point: OpenLayers.Geometry.Point
            }

            export interface State extends WazeNS.Model.Object<number>
            {
                countryID: string;
                isDefault: boolean;
            }

            export interface Venue extends Feature.Vector.Venue
            {
                attributes: {
                    adLocked: boolean;
                    aliases: Array<string>;
                    approved: boolean;
                    brand: string;
                    categories: Array<string>;
                    categoryAttributes: {
                        PARKING_LOT: {
                            canExitWhileClosed: boolean;
                            costType: string;
                            hasTBR: boolean;
                            lotType: Array<any>;
                            parkingType: string;
                            paymentType: Array<any>;
                        }
                    }
                    createdBy: number;
                    createdOn: number;
                    description: string;
                    entryExitPoints: Array<{
                        getEntry(): boolean;
                        getExit(): boolean;
                        getName(): string;
                        getPoint(): OpenLayers.Geometry.Point;
                        isPrimary(): boolean;
                    }>;
                    externalProviderIDs: Array<WazeNS.Model.Object.ExternalProvider>;
                    geometry: OpenLayers.Geometry.Collection;
                    houseNumber: string;
                    id: string;
                    lockRank: number;
                    name: string;
                    openingHours: Array<any>;
                    phone: string;
                    residential: boolean;
                    streetID: number;
                    updatedBy: number;
                    updatedOn: number;
                    url: string;
                };
                id: string;
                geometry: OpenLayers.Geometry.Collection;
            }

            export interface Segment extends Feature.Vector.Segment
            {
                attributes: {
                    createdBy: number;
                    createdOn: number;
                    flags: number;
                    fwdDirection: boolean;
                    fwdLaneCount: number;
                    fwdMaxSpeed: number;
                    fwdMaxSpeedUnverified: boolean;
                    fwdToll: boolean;
                    geometry: OpenLayers.Geometry;
                    hasClosures: boolean;
                    hasHNs: boolean;
                    id: number;
                    length: number;
                    level: number;
                    lockRank: number;
                    primaryStreetID: number;
                    rank: number;
                    revDirection: boolean;
                    revLaneCount: number;
                    revMaxSpeed: number;
                    revMaxSpeedUnverified: boolean;
                    revToll: boolean;
                    roadType: number;
                    routingRoadType: number;
                    streetIDs: Array<number>;
                    updatedBy: number;
                    updatedOn: number;
                    validated: boolean;
                };
                geometry: OpenLayers.Geometry.Collection;
            }

            export interface SegmentSuggestion extends Feature.Vector.SegmentSuggestion
            {
                attributes: {
                    confidenceScore: number;
                    countryId: number;
                    fwdDirection: boolean;
                    fwdMaxSpeed: number;
                    geometry: OpenLayers.Geometry;
                    rejectionReason: number;
                    revDirection: boolean;
                    revMaxSpeed: number;
                    roadType: number;
                    status: string;
                    streetName: string;
                    tunnel: boolean;
                    unpaved: boolean;
                    updatedBy: number;
                    updatedOn: number;
                    wazeSegmentId: number;
                };
                geometry: OpenLayers.Geometry.Collection;
            }

            export interface Street extends Model.Object<number>
            {
                cityID: number;
                isEmpty: boolean;
                signText: string;
                signType: number;
                direction: string;
            }

            export interface LoggedInUser
            {
                LevelToMies: number;
                isCountryManager: boolean;
                CLASS_NAME: string;
                normalizedLevel: number;
                editableMiles: number;
                adOperator: boolean;
                chatBanned: boolean;
                debugUser: boolean;
                globalEditor: boolean;
                id: number;
                isAreaManager: boolean;
                isFiltered: boolean;
                isStaff: boolean;
                mapEditingBanned: boolean;
                mteManager: boolean;
                rank: number;
                totalEdits: number;
                totalPoints: number;
                userName: string;
                areas: Array<EditableArea>;
            }

            export interface User extends Feature.Vector.User
            {
                id: number;
                normalizedLevel: number;
                rank: number;
                type: string;
                userName: string;
            }

            export interface ExternalProvider {
                attributes: {
                    id: string;
                    location: string;
                    name: string;
                    url: string;
                    uuid: string;
                };
                changed: {
                    uuid: string;
                };
                cid: string;
                id: string;
                previousAttributes: {
                    id: string;
                    location: string;
                    name: string;
                    url: string;
                    uuid: string;
                };
            }
        }

        namespace Graph
        {
            export interface TurnGraph
            {
                getTurnThroughNode(n: Feature.Vector.Node, fromSeg: Feature.Vector.Segment, toSeg: Feature.Vector.Segment) : Turn;
            }

            export interface Turn {
                getTurnData(): TurnData;
            }

            export interface TurnData {
                getInstructionOpcode(): string;
                hasInstructionOpcode(): boolean;
                getRestrictions() : Array<Feature.TurnRestriction>;
                isAllowed(): boolean;
                isDisallowed(): boolean;
                isUnknown(): boolean;
                hasTurnGuidance(): boolean;
                getTurnGuidance(): TurnGuidance;
            }

            export interface TurnGuidance {
                getTowards(): string;
                getTTS(): string;
                getVisualInstruction(): string;
                getRoadShields(): any;
                getExitSigns(): Array<ExitSign>;
            }

            export interface ExitSign {
                text: string;
                type: number
            }

        }

        interface NumberRepository<T> extends WazeNS.Model.ObjectRepository<T, number>
        {
            model: WazeNS.DataModel;
            name: string;
            objectType: string;
            active: boolean;
            objects: {
                [id: number]: T
            };
        }

        interface StringRepository<T> extends WazeNS.Model.ObjectRepository<T, string>
        {
            model: WazeNS.DataModel;
            name: string;
            objectType: string;
            active: boolean;
            objects: {
                [id: string]: T
            };
        }

        interface RepositoryOfSegments extends SegmentRepository
        {
            active: boolean;
            name: string;
            objectType: string;
            objects: {
                [id: number]: Model.Object.Segment
            }
        }

        export interface Flag {
            flag: number;
            mask: string;
        }

        export interface ObjectRepository<T, TId>
        {
            getByAttributes(e: any): T;
            getObjectById(id: TId): T;
        }

        export interface SegmentRepository extends ObjectRepository<Model.Object.Segment, number>
        {
            zoomToRoadType: Array<any>;
            topCityID: number;

            CLASS_NAME: string;
        }

        export interface LandmarkRepository extends StringRepository<Model.Object.Venue>
        {
            clear(): void;
        }

        export interface VenueRepository extends LandmarkRepository
        {
            filter: {
                _categoryOrder: Array<any>;
                _attributes: Array<any>;
                setAttribute(filter: string, attribute: string, value: any);
            }
        }

        export interface Object<T>
        {
            // id: T;
            state: string;
            name: string;
            type: string;
            persistent: boolean;

            arePropertiesEditable(): boolean;
            clone() : Object<T>;
            getCreatedBy(): number;
            getCreatedOn(): number;
            getID(): T;
            getPermissions(): number;
            getType(): string;
            getUpdatedBy(): number;
            getUpdatedOn(): number;
            getVersion() : number;
            id: T;
            isAllowed(permission: number): boolean;
            isDeletable(): boolean;
            isDeleted(): boolean;
            isGeometryEditable(): boolean;
            isInUse(e: any): boolean;
            isNew(): boolean;
            isPersistent(): boolean;
            isSelected(): boolean;
            isSnapped(): boolean;
            isUnchanged(): boolean;
            isUpdated(): boolean;
            merge(e: any): void;
            setID(id: T): void;
            setPersistent(e: boolean): void;
            setSelected(e: boolean): void;
            setSnapped(e: boolean): void;
            CLASS_NAME: string;
        }

    }

    namespace Feature
    {
        namespace Vector
        {
            export interface LoggedInUser
            {
                areas: Array<WazeNS.Model.Object.EditableArea>;
            }

            export interface Landmark extends Vector<string>
            {
                constructor({
                    geometry,
                    categories
                });
                is2D(): boolean;
                isPoint(): boolean;
                arePropertiesEditable(): boolean;
                areUpdateRequestsEditable(): boolean;
                getAddress(): WazeNS.Model.Object.Address;
                getCategorySet(): {
                    [propName: string]: boolean;
                };
                getLockRank(): number;
                getMainCategory(): string;
                getNavigationPoint(): WazeNS.Model.Object.NavigationPoint;
                getPointGeometry(): OpenLayers.Geometry.Point;
                getPolygonGeometry(): OpenLayers.Geometry.Polygon;
                hasOpenUpdateRequests(): boolean;
                isApproved(): boolean;
                isGasStation(): boolean;
                isParkingLot(): boolean;
                isPoint(): boolean;
                isResidential(): boolean;
            }

            export interface Node extends Vector<number>
            {
                allConnectionKeys() : {
                    all: Array<{
                        from: Model.Object.Segment;
                        to: Model.Object.Segment;
                    }>;
                    legal: Array<{
                        from: Model.Object.Segment;
                        to: Model.Object.Segment;
                    }>;
                };
                areAllConnectionsDisabled(): boolean;
                areAllConnectionsEnabled(): boolean;
                attributes: {
                    id: number;
                    segIDs: Array<number>;
                    name: string;
                    labelText: string;
                };
                connectionsExist(): boolean;
                isDeleteable(model: WazeNS.DataModel): boolean;
            }

            export interface Segment extends WazeNS.Feature.Vector<number>
            {
                // arePropertiesEditable(): boolean;
                areTurnsLocked(node: WazeNS.Feature.Vector.Node):boolean;
                getAddress(): WazeNS.Model.Object.Address;
                getFlagAttributes(): {
                    beacons: boolean;
                    fwdLanesEnabled: boolean;
                    fwdSpeedCamera: boolean;
                    headlights: boolean;
                    nearbyHOV: boolean;
                    revLanesEnabled: boolean;
                    revSpeedCamera: boolean;
                    tunnel: boolean;
                    unpaved: boolean;
                };
                getFlagAttribute(flag: string): boolean;
                getRoundabout(): WazeNS.Model.Object.Junction;
                hasBeacons(): boolean;
                hasClosures(): boolean;
                hasNonEmptyStreet(): boolean;
                hasRestrictions(): boolean;
                isDrivable(): boolean;
                isInBigJunction(): boolean;
                isInRoundabout(): boolean;
                isLanesEnabled(fwdOrReverse: number): boolean;
                isLockedByHigherRank(): boolean;
                isTollRoad(): boolean;
                isTurnAllowed(toSegment: Model.Object.Segment, Node: any): boolean;
                // getRestrictionCount(): number;
                getConnectedSegments(direction: string): Array<Model.Object.Segment>;
                getConnectedSegmentsByDirection(direction: string) : Array<Model.Object.Segment>;
                getDrivingRestrictionCount(): number;
                getDrivingRestrictions(): Array<DrivingRestriction>;
                getNodeByDirection(direction: string): Feature.Vector.Node;
            }

            export interface SegmentSuggestion extends WazeNS.Feature.Vector<number>
            {
                getCenter(): any;
                getStatus(): string;
            }

            export interface User
            {
                MaxLeve: number;
                MinLevel: number;
                StaffRank: number;
                isStaffUser(): boolean;
            }

            export interface Venue extends WazeNS.Feature.Vector<string> {
                areExternalProvidersEditable(): boolean;
                arePropertiesEditable(): boolean;
                areUpdateRequestsEditable(): boolean;
                canConvertToPublic(): boolean;
                getAddress(): WazeNS.Model.Object.Address;
                getCategorySet(): Set<string>;
                getLockRank(): number;
                getMainCategory(): string;
                getPointGeometry(): OpenLayers.Geometry.Point;
                getPolygonGeometry(): OpenLayers.Geometry.Polygon;
                hasOpenUpdateRequests(): boolean;
                hasUpdateRequests(): boolean;
                is2D(): boolean;
                isAdLocked(): boolean;
                isApproved(): boolean;
                isGasStation(): boolean;
                isParkingLot(): boolean;
                isPoint(): boolean;
                isResidential(): boolean;

            }
        }

        export interface DrivingRestriction extends Restriction {
        }

        export interface TurnRestriction extends Restriction {
        }

        export interface Restriction {
            isExpired(): boolean;
        }

        export interface Vector<T> extends WazeNS.Model.Object<T>
        {
            type: string;
            CLASS_NAME: string;
        }
    }

    namespace Modules {
        namespace Cities {
            namespace Model {
                export interface Repository extends WazeNS.Model.ObjectRepository<WazeNS.Modules.Cities.Model.City, number> {
                    getValidCities(): Array<WazeNS.Modules.Cities.Model.City>;
                }

                export interface City extends WazeNS.Feature.Vector<string> {
                    attributes: {
                        countryID: number;
                        englishName: string;
                        geometry: OpenLayers.Geometry;
                        id: number;
                        isEmpty: boolean;
                        name: string;
                        rank: number;
                        stateID: number;
                        labelText: string;
                    }
                    geometry: OpenLayers.Geometry;
                    hasName(): boolean;
                    isEmpty(): boolean;
                    showMarker(): boolean;
                }
            }
        }
    }
}

interface WazeStatic {
    loginManager: WazeNS.LoginManager;
    map: WazeNS.Map;
    model: WazeNS.DataModel;
    vent: any;
    controller: WazeNS.Controller;
    location: {
        code: string;
    };
    selectionManager: WazeNS.SelectionManager;
    Config: {
        venues: {
            categories: Array<string>;
            subcategories: {
                [propName: string]: Array<string>;
            }
        }
    };
    app: WazeNS.App;
    prefs: WazeNS.Prefs;
}

declare var W: WazeStatic;
//declare var Waze: WazeStatic;