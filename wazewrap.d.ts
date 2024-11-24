/// <reference path="waze.d.ts" />

declare namespace WazeWrap
{
    namespace Model
    {
        function getPrimaryStreetID(segmentID: number): WazeNS.Model.Object.Segment;
        function getStreetName(primaryStreetID: number): string;
        function getCityID(primaryStreetID: number): number;
        function getCityName(primaryStreetID: number): string;
        function getStateID(primaryStreetID: number): number;
        function getStateName(primaryStreetID: number): string;
        function getCountryID(primaryStreetID: number): number;
        function getCountryName(primaryStreetID: number): string;
        function getCityNameFromSegmentObj(segObj: WazeNS.Model.Object.Segment): string;
        function getStateNameFromSegmentObj(segObj: WazeNS.Model.Object.Segment): string;
        function getAllRoundaboutSegmentsFromObj(segObj: WazeNS.Model.Object.Segment): string;
        function getAllRoundaboutJunctionNodesFromObj(segObj: WazeNS.Model.Object.Segment): string;
        function isRoundaboutSegmentID(segmentId: number): boolean;
        function isRoundabountSegmentObj(segObj: WazeNS.Model.Object.Segment): boolean;
        function getOnscreenSegment(): Array<WazeNS.Model.Object.Segment>;
        function onModelReady(callback: (context: any) => void, now: boolean, context: any): void;
        function RouteSelection(firstSegment: WazeNS.Model.Object.Segment, lastSegment: WazeNS.Model.Object.Segment, callback: () => void | Array<() => void>, options: any): void;
    }

    namespace Interface
    {
        export class Tab
        {
            constructor(name: string, content: string, callback: (context: any)=>void, context: any);
            append(content: string): void;
            appendTab(): void;
            clearContent(): void;
            destroy(): void;
        }

        export class Shortcut {
            constructor(name: string, desc: string, group: string, title: string, shortcut: any, callback: any, scope: any);
            add(): Shortcut;
            remove(): Shortcut;
            change(shortcut: Shortcut): Shortcut;
        }

        function AddLayerCheckbox(group: string, checkboxText: string, checked: boolean, callback: (checked: boolean) => void, layer?: any): void;
        function ShowScriptUpdate(scriptName: string, version: string, updateHTML: string, greasyForkLink?: string, forumLink?: string): void;

    }

    namespace User {
        function Rank(): number;
        function Username(): string;
        function isCM(): boolean;
        function isAM(): boolean;
    }

    namespace Util {
        function waitForElement(selector: string, callback: (context: any) => void, context: any): void;
        function mapReady(): boolean;
        function modelReady(): boolean;
        function OrthogonalizeGeometry(geometry: OpenLayers.Geometry, threshold: number): OpenLayers.Geometry;
        function findSegment(server: string, segmentID: number): OpenLayers.Geometry.Point;
        function findVenue(server: string, venueID: number): OpenLayers.Geometry.Point;
    }

    namespace Geometry {
        function ConvertTo4326(lon: number, lat: number): OpenLayers.LonLat;
        function ConvertTo900912(lon: number, lat: number): OpenLayers.LonLat;
        function CalculateLongOffsetGPS(longMetersOffset: number, lon: number, lat: number): number;
        function CalculateLatOffsetGPS(latMetersOffset: number, lat: number);
        function isLonLatInMapExtent(lonlat: OpenLayers.LonLat): boolean;
        function isGeometryInMapExtent(geometry: OpenLayers.Geometry);
        function calculateDistance(pointArray: any): number;
        function findClosestSegment(mygeometry: any, ignorePLR: boolean, ignoreUnnamedPR: boolean): any
    }

    namespace Events {
        function register(event: string, context: any, handler: any, errorHandler: (err: any) => void): void;
        function unregister(event: string, context: any, handler: any): void;
    }

    namespace Alerts {
        function success(scriptName: string, message: string): void;
        function info(scriptName: string, message: string, disableTimeout?:boolean, disableClickToClose?:boolean) : void;
        function warning(scriptName: string, message: string): void;
        function error(scriptName: string, message: string, disableTimeout?:boolean, disableClickToClose?:boolean) : void;
        function debug(scriptName: string, message: string): void;
        function prompt(scriptName: string, message: string, defaultText?: string, okFunction?: any, cancelFunction?: any): void;
        function confirm(scriptName: string, message: string, okFunction?: any, cancelFunction?: any, okBtnText?: string, cancelBtnText?: string): void;
        class ScriptUpdateMonitor {
            constructor(scriptName: string, currentVersion: string|number, downloadUrl: string, GM_xmlHTTPRequest: object,
                metaUrl?: string, metaRegExp?: RegExp);
            start(intervalHours?: number, checkImmediately?: boolean): void;
            stop(): void;
        }
    }

    namespace Remote {
        function SaveSettings(scriptName: string, scriptSettings: any): void;
        function RetrieveSettings(script: string): any;
    }

    namespace String {
        function toTitleCase(str: string): string;
    }

    function getSelectedFeatures(): Array<any>
    function hasSelectedFeatures(): boolean;
    function selectFeature(feature: any): any;
    function selectFeatures(featureArray: Array<any>): any;
    function hasPlaceSelected(): boolean;
    function hasSegmentSelected(): boolean;
    function hasMapCommentSelected(): boolean;

    export var Ready: boolean;
}
